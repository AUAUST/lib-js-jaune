import type { Matrix3 } from "#space/types/Matrix3";

/**
 * Linear sRGB to CIE XYZ D65, per CSS Color 4.
 */
export const srgbLinearToXyzD65: Matrix3 = [
  [506_752 / 1_228_815, 87_881 / 245_763, 12_673 / 70_218],
  [87_098 / 409_605, 175_762 / 245_763, 12_673 / 175_545],
  [7918 / 409_605, 87_881 / 737_289, 1_001_167 / 1_053_270],
];

/**
 * CIE XYZ D65 to linear sRGB, per CSS Color 4.
 */
export const xyzD65ToSrgbLinear: Matrix3 = [
  [12_831 / 3959, -329 / 214, -1974 / 3959],
  [-851_781 / 878_810, 1_648_619 / 878_810, 36_519 / 878_810],
  [705 / 12_673, -2585 / 12_673, 705 / 667],
];

/**
 * Encoded sRGB magnitude up to which the transfer function is linear.
 */
export const srgbEncodedThreshold = 0.04045;

/**
 * Linear sRGB magnitude up to which the transfer function is linear.
 */
export const srgbLinearThreshold = 0.00313_08;

/**
 * Slope of the linear segment of the sRGB transfer function.
 */
export const srgbLinearSlope = 12.92;

/**
 * Exponent of the sRGB transfer function.
 */
export const srgbGamma = 2.4;

/**
 * Scale of the power segment of the sRGB transfer function.
 */
export const srgbScale = 1.055;

/**
 * Offset of the power segment of the sRGB transfer function.
 */
export const srgbOffset = 0.055;
