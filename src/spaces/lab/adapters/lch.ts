import { createPolarSpace } from "#space/utils/createPolarSpace";
import { lab } from "#spaces/lab/adapters/lab";
import { labAchromaticThreshold } from "#spaces/lab/constants";

/**
 * CIE LCH, the polar form of `lab`; unbounded. Achromatic colors get hue 0.
 */
export const lch = createPolarSpace({
  id: "lch",
  base: lab,
  chromaRange: [0, 150],
  achromaticThreshold: labAchromaticThreshold,
});
