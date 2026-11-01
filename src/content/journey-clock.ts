/** Align the six narrative stops with the authored 1-based frames 1,15,29,44,58,72. */
const stops = [0, 14, 28, 43, 57, 71];
export function journeySourceFrame(progress: number) {
  const q = Math.max(0, Math.min(1, progress)) * 5;
  const i = Math.min(4, Math.floor(q));
  return stops[i] + (stops[i + 1] - stops[i]) * (q - i);
}
export const journeySourceFps = 6;
