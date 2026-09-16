# TerraSat AI

TerraSat AI is a web application for Sentinel-2 parcel analysis, agricultural decision support, and informational MRV reporting.

## Local development

1. Install Node.js 22 or later.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set `GEMINI_API_KEY` locally. Never commit `.env`.
4. Run `npm run dev`, then open `http://localhost:3000`.

Useful commands:

```text
npm run test
npm run lint
npm run build
```

## Security and deployment

- `ALLOW_INSECURE_LOCAL_AUTH=true` is permitted only for a private local development machine. It creates a local administrator session for previewing the app.
- Production refuses to start without a `JWT_SECRET` of at least 32 characters. Clients must send a Bearer token with `sub`, `companyId`, and `role` (`admin`, `analyst`, or `viewer`) claims.
- Set `CORS_ORIGINS` to a comma-separated, explicit list of deployed frontend origins.
- Runtime reports, jobs, cache files, and artifacts are excluded from Git. Local file storage is suitable only for one server with persistent disk; deploy a durable shared store before scaling to multiple instances.
- Gemini requests are made from the server only. Do not expose `GEMINI_API_KEY` in browser code or Vite environment variables.

## Scope notes

The Windows desktop installer is not bundled with this web release. Its download endpoints intentionally return HTTP 501 instead of claiming a nonexistent installer is available.

Satellite-derived results and generated reports are decision-support material, not field verification, emissions certification, or an assurance opinion.
