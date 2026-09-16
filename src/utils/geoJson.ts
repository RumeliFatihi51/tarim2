export function toClosedGeoJsonRing(points: [number, number][]): [number, number][] {
  const ring = points.map(([lat, lng]) => [lng, lat] as [number, number]);
  if (ring.length < 3) return ring;
  const first = ring[0];
  const last = ring[ring.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) ring.push([...first]);
  return ring;
}
