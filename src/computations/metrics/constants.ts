/**
 * Lightness above which a color is light, and at or below which it is dark.
 */
export const lightnessThreshold = 0.5;

/**
 * Viewing flare WCAG adds to both luminances of a contrast ratio.
 */
export const contrastFlare = 0.05;

/**
 * Largest `deltaE` and alpha difference at which `equals` holds.
 */
export const equalityTolerance = 1e-5;

/**
 * Exponent APCA raises sRGB channels to for its screen luminance.
 */
export const apcaMainTrc = 2.4;

/**
 * APCA weights of the red, green and blue channels.
 */
export const apcaChannelWeights = [0.21267_29, 0.71515_22, 0.07217_5] as const;

/**
 * APCA exponent of the background luminance for dark text on a light background.
 */
export const apcaNormalBackground = 0.56;

/**
 * APCA exponent of the text luminance for dark text on a light background.
 */
export const apcaNormalText = 0.57;

/**
 * APCA exponent of the background luminance for light text on a dark background.
 */
export const apcaReverseBackground = 0.65;

/**
 * APCA exponent of the text luminance for light text on a dark background.
 */
export const apcaReverseText = 0.62;

/**
 * Luminance below which APCA soft-clamps toward black.
 */
export const apcaBlackThreshold = 0.022;

/**
 * Exponent of APCA's soft clamp toward black.
 */
export const apcaBlackClamp = 1.414;

/**
 * APCA scale of the contrast for dark text on a light background.
 */
export const apcaScaleBlackOnWhite = 1.14;

/**
 * APCA scale of the contrast for light text on a dark background.
 */
export const apcaScaleWhiteOnBlack = 1.14;

/**
 * APCA offset subtracted from the contrast for dark text on a light background.
 */
export const apcaOffsetBlackOnWhite = 0.027;

/**
 * APCA offset added to the contrast for light text on a dark background.
 */
export const apcaOffsetWhiteOnBlack = 0.027;

/**
 * Luminance difference below which APCA reports no contrast.
 */
export const apcaMinimumLuminanceDelta = 0.0005;

/**
 * Contrast magnitude below which APCA reports no contrast.
 */
export const apcaLowClip = 0.1;
