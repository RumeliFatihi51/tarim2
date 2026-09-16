import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { JobManager } from '../server/jobs/jobManager';
import { AppError } from '../server/errors';
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
