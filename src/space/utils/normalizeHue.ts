/**
 * The angle `degrees` brought into [0, 360).
 */
export function normalizeHue(degrees: number): number {
  const hue = degrees % 360;

  return hue < 0 ? (hue + 360) % 360 : hue;
}
