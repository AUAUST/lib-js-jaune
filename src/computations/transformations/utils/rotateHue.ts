import { createColor } from "#color/utils/createColor";
import { convertCoords } from "#space/utils/convertCoords";
import { normalizeHue } from "#space/utils/normalizeHue";
import { hsl } from "#spaces/hsl/adapters/hsl";
import type { Color } from "#color/types/Color";

/**
 * `color` with its HSL hue rotated by `degrees`, negative degrees rotating
 * backwards, in the space of `color` and with its alpha.
 */
export function rotateHue(color: Color, degrees: number): Color {
  const coords = convertCoords(color.space, hsl, color.coords, [0, 0, 0]);

  coords[0] = normalizeHue(coords[0] + degrees);

  return createColor(
    color.space,
    convertCoords(hsl, color.space, coords, coords),
    color.alpha,
  );
}
