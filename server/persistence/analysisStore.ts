import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import type { FullAnalysisPayload } from '../types';

export type PersistedAnalysis = FullAnalysisPayload & { analysisId: string; persistedAt: string };

function safeDirectoryName(value: string): string {
  return encodeURIComponent(value).replace(/%/g, '_');
}

/** Append-only local archive: a newer run cannot overwrite an earlier MRV report. */
export class AnalysisStore {
  constructor(
    private readonly directory = process.env.ANALYSIS_STORAGE_DIR || path.join(process.cwd(), 'data', 'analyses'),
  ) {}

  private companyDirectory(companyId: string): string {
    return path.join(this.directory, safeDirectoryName(companyId));
  }

  private recordsDirectory(companyId: string): string {
    return path.join(this.companyDirectory(companyId), 'records');
  }

  save(companyId: string, payload: FullAnalysisPayload): PersistedAnalysis {
    const persistedAt = new Date().toISOString();
    const record: PersistedAnalysis = { ...payload, analysisId: crypto.randomUUID(), persistedAt };
    const directory = this.recordsDirectory(companyId);
    fs.mkdirSync(directory, { recursive: true });
    const fileName = `${persistedAt.replace(/[:.]/g, '-')}-${record.analysisId}.json`;
    const target = path.join(directory, fileName);
    const temporary = `${target}.tmp`;
    fs.writeFileSync(temporary, JSON.stringify(record));
    fs.renameSync(temporary, target);
    return record;
  }

  private readFiles(directory: string): PersistedAnalysis[] {
    try {
      return fs.readdirSync(directory)
        .filter((name) => name.endsWith('.json'))
        .flatMap((name) => {
          try {
            return [JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8')) as PersistedAnalysis];
          } catch {
            return [];
          }
        });
    } catch {
      return [];
    }
  }

  list(companyId: string): PersistedAnalysis[] {
    // Read the prior one-file-per-parcel layout too, preserving existing users' records.
    return [...this.readFiles(this.recordsDirectory(companyId)), ...this.readFiles(this.companyDirectory(companyId))]
      .sort((a, b) => (b.persistedAt || b.timestamp || '').localeCompare(a.persistedAt || a.timestamp || ''));
  }

  get(companyId: string, parcelId: string): PersistedAnalysis | undefined {
    return this.list(companyId).find((record) => record.parcel.id === parcelId);
  }

  getById(companyId: string, analysisId: string): PersistedAnalysis | undefined {
    return this.list(companyId).find((record) => record.analysisId === analysisId);
  }

  listForParcel(companyId: string, parcelId: string): PersistedAnalysis[] {
    return this.list(companyId).filter((record) => record.parcel.id === parcelId);
  }
}

export const analysisStore = new AnalysisStore();
