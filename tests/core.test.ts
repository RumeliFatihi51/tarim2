import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { JobManager } from '../server/jobs/jobManager';
import { AnalysisStore } from '../server/persistence/analysisStore';
import { AppError } from '../server/errors';
import type { FullAnalysisPayload } from '../src/types';
import { validateAnalysisRequest } from '../server/validation';
import { toClosedGeoJsonRing } from '../src/utils/geoJson';

test('analysis requests reject missing or malformed polygons as client errors', () => {
  assert.throws(
    () => validateAnalysisRequest({}),
    (error: unknown) => error instanceof AppError && error.status === 400,
  );
});

test('analysis jobs are visible only to their owning tenant', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'terrasat-jobs-'));
  try {
    const manager = new JobManager(path.join(directory, 'jobs.json'));
    manager.createJob('job-a', 'company-a', 'DEMO');
    assert.ok(manager.getJob('job-a', 'company-a'));
    assert.equal(manager.getJob('job-a', 'company-b'), undefined);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('Leaflet parcel coordinates become a closed GeoJSON longitude-latitude ring', () => {
  const ring = toClosedGeoJsonRing([[38.64, 27.11], [38.65, 27.12], [38.64, 27.13]]);
  assert.deepEqual(ring, [[27.11, 38.64], [27.12, 38.65], [27.13, 38.64], [27.11, 38.64]]);
  assert.doesNotThrow(() => validateAnalysisRequest({ polygon: { type: 'Polygon', coordinates: [ring] } }));
});

test('completed analyses are appended instead of overwriting earlier MRV reports', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'terrasat-analyses-'));
  const payload = (label: string): FullAnalysisPayload => ({
    parcel: {
      id: 'parcel-1', number: '#P-1', name: label, location: 'Test', crop: 'Zeytin', areaHa: 1,
      status: 'healthy', ndvi: 0.6, ndwi: 0.2, soilMoisture: 40, waterStress: 'Low', plantHealth: 'Good', carbonIndicator: 'Stable', polygon: [[38, 27]],
    },
    satelliteMetadata: {}, spectralBands: {}, calculatedIndices: { ndvi: 0.6, ndviTrend: 0, ndwi: 0.2, ndwiTrend: 0, ndmi: 0.1, soilMoisture: 40, waterStress: 'Low', plantHealth: 'Good', carbonIndicator: 'Stable' },
    pixelStats: {}, spectralStats: {}, aiAssessment: {} as FullAnalysisPayload['aiAssessment'], mrvReport: { reportId: `MRV-${label}` },
  });
  try {
    const store = new AnalysisStore(directory);
    const first = store.save('company-a', payload('İlk analiz'));
    const second = store.save('company-a', payload('İkinci analiz'));
    assert.notEqual(first.analysisId, second.analysisId);
    assert.equal(store.listForParcel('company-a', 'parcel-1').length, 2);
    assert.equal(store.list('company-a').length, 2);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
