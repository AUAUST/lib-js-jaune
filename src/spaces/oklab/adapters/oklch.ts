import { createPolarSpace } from "#space/utils/createPolarSpace";
import { oklab } from "#spaces/oklab/adapters/oklab";
import { oklabAchromaticThreshold } from "#spaces/oklab/constants";

/**
 * OKLCH, the polar form of `oklab`; unbounded. Achromatic colors get hue 0.
 */
export const oklch = createPolarSpace({
  id: "oklch",
  base: oklab,
  chromaRange: [0, 0.4],
  achromaticThreshold: oklabAchromaticThreshold,
});
