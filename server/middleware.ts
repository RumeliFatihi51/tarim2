import crypto from 'crypto';
import type { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errors';
import { config } from './config';

export interface AuthContext { userId: string; companyId: string; role: 'admin' | 'analyst' | 'viewer' }
export interface AuthenticatedRequest extends Request { auth?: AuthContext; requestId?: string }

export function requestContext(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  req.requestId = req.header('x-request-id')?.slice(0, 100) || crypto.randomUUID();
  res.setHeader('x-request-id', req.requestId);
  next();
}

export function authenticate(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  if (config.ALLOW_INSECURE_LOCAL_AUTH) {
    req.auth = { userId: 'local-dev', companyId: 'local-dev', role: 'admin' };
    return next();
  }

  const token = req.header('authorization')?.replace(/^Bearer\s+/i, '');
  if (!config.JWT_SECRET || !token) {
    return next(new AppError('UNAUTHORIZED', 'Authentication is required.', 401));
  }
  try {
    const claims = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload;
    if (!claims.sub || typeof claims.companyId !== 'string' || !['admin', 'analyst', 'viewer'].includes(claims.role)) {
      throw new Error('Missing tenant claims');
    }
    req.auth = { userId: claims.sub, companyId: claims.companyId, role: claims.role } as AuthContext;
    next();
  } catch {
    next(new AppError('UNAUTHORIZED', 'Authentication token is invalid or expired.', 401));
  }
}

export function requireRole(...roles: AuthContext['role'][]): RequestHandler {
  return (req: AuthenticatedRequest, _res, next) => {
    if (!req.auth || !roles.includes(req.auth.role)) {
      return next(new AppError('FORBIDDEN', 'You do not have permission to perform this action.', 403));
    }
    next();
  };
}

export const errorHandler: ErrorRequestHandler = (error, req: AuthenticatedRequest, res, _next) => {
  const appError = error instanceof AppError ? error : new AppError('INTERNAL_ERROR', 'Unexpected server error', 500);
  if (appError.status >= 500) console.error(JSON.stringify({ level: 'error', requestId: req.requestId, code: appError.code, message: error instanceof Error ? error.message : String(error) }));
  res.status(appError.status).json({ error: { code: appError.code, message: appError.message, details: appError.status < 500 ? appError.details : undefined }, requestId: req.requestId });
};
