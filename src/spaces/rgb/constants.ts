import { createMatrix } from "#space/utils/createMatrix";

/**
 * Linear sRGB to CIE XYZ D65, per CSS Color 4.
 */
export const srgbLinearToXyzD65 = createMatrix([
  [506_752 / 1_228_815, 87_881 / 245_763, 12_673 / 70_218],
  [87_098 / 409_605, 175_762 / 245_763, 12_673 / 175_545],
  [7918 / 409_605, 87_881 / 737_289, 1_001_167 / 1_053_270],
]);

/**
 * CIE XYZ D65 to linear sRGB, per CSS Color 4.
 */
export const xyzD65ToSrgbLinear = createMatrix([
  [12_831 / 3959, -329 / 214, -1974 / 3959],
  [-851_781 / 878_810, 1_648_619 / 878_810, 36_519 / 878_810],
  [705 / 12_673, -2585 / 12_673, 705 / 667],
]);

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

/**
 * Linear Display P3 to CIE XYZ D65, per CSS Color 4.
 */
export const displayP3LinearToXyzD65 = createMatrix([
  [608_311 / 1_250_200, 189_793 / 714_400, 198_249 / 1_000_160],
  [35_783 / 156_275, 247_089 / 357_200, 198_249 / 2_500_400],
  [0, 32_229 / 714_400, 5_220_557 / 5_000_800],
]);

/**
 * CIE XYZ D65 to linear Display P3, per CSS Color 4.
 */
export const xyzD65ToDisplayP3Linear = createMatrix([
  [446_124 / 178_915, -333_277 / 357_830, -72_051 / 178_915],
  [-14_852 / 17_905, 63_121 / 35_810, 423 / 17_905],
  [11_844 / 330_415, -50_337 / 660_830, 316_169 / 330_415],
]);

/**
 * Linear A98 RGB to CIE XYZ D65, per CSS Color 4.
 */
export const a98RgbLinearToXyzD65 = createMatrix([
  [573_536 / 994_567, 263_643 / 1_420_810, 187_206 / 994_567],
  [591_459 / 1_989_134, 6_239_551 / 9_945_670, 374_412 / 4_972_835],
  [53_769 / 1_989_134, 351_524 / 4_972_835, 4_929_758 / 4_972_835],
]);

/**
 * CIE XYZ D65 to linear A98 RGB, per CSS Color 4.
 */
export const xyzD65ToA98RgbLinear = createMatrix([
  [1_829_569 / 896_150, -506_331 / 896_150, -308_931 / 896_150],
  [-851_781 / 878_810, 1_648_619 / 878_810, 36_519 / 878_810],
  [16_779 / 1_248_040, -147_721 / 1_248_040, 1_266_979 / 1_248_040],
]);

/**
 * Exponent of the A98 RGB transfer function.
 */
export const a98RgbGamma = 563 / 256;

/**
 * Linear ProPhoto RGB to CIE XYZ D50, per CSS Color 4.
 */
export const prophotoRgbLinearToXyzD50 = createMatrix([
  [0.79776_66449_00642_3, 0.13518_12974_00533_08, 0.03134_77341_28392_2],
  [0.28807_48288_19401_3, 0.71183_52342_41873, 0.00008_99369_38725_64],
  [0, 0, 0.82510_46025_10460_2],
]);

/**
 * CIE XYZ D50 to linear ProPhoto RGB, per CSS Color 4.
 */
export const xyzD50ToProphotoRgbLinear = createMatrix([
  [1.34578_68816_47158_3, -0.25557_20873_79794_64, -0.05110_18649_75545_26],
  [-0.54463_07051_24901_9, 1.50824_77428_45146_8, 0.02052_74474_36421_39],
  [0, 0, 1.21196_75456_38945_2],
]);

/**
 * Exponent of the ProPhoto RGB transfer function.
 */
export const prophotoRgbGamma = 1.8;

/**
 * Slope of the linear segment of the ProPhoto RGB transfer function.
 */
export const prophotoRgbLinearSlope = 16;

/**
 * Linear ProPhoto RGB magnitude below which the transfer function is linear.
 */
export const prophotoRgbLinearThreshold = 1 / 512;

/**
 * Encoded ProPhoto RGB magnitude below which the transfer function is linear.
 */
export const prophotoRgbEncodedThreshold = 16 / 512;

/**
 * Linear Rec. 2020 to CIE XYZ D65, per CSS Color 4.
 */
export const rec2020LinearToXyzD65 = createMatrix([
  [63_426_534 / 99_577_255, 20_160_776 / 139_408_157, 47_086_771 / 278_816_314],
  [26_158_966 / 99_577_255, 472_592_308 / 697_040_785, 8_267_143 / 139_408_157],
  [0, 19_567_812 / 697_040_785, 295_819_943 / 278_816_314],
]);

/**
 * CIE XYZ D65 to linear Rec. 2020, per CSS Color 4.
 */
export const xyzD65ToRec2020Linear = createMatrix([
  [30_757_411 / 17_917_100, -6_372_589 / 17_917_100, -4_539_589 / 17_917_100],
  [-19_765_991 / 29_648_200, 47_925_759 / 29_648_200, 467_509 / 29_648_200],
  [792_561 / 44_930_125, -1_921_689 / 44_930_125, 42_328_811 / 44_930_125],
]);

/**
 * Scale (α) of the power segment of the BT.2020 transfer function.
 */
export const rec2020Alpha = 1.09929_68268_0944;

/**
 * Linear Rec. 2020 magnitude (β) below which the transfer function is linear.
 */
export const rec2020Beta = 0.01805_39685_10807;

/**
 * Exponent of the BT.2020 transfer function.
 */
export const rec2020Gamma = 0.45;

/**
 * Slope of the linear segment of the BT.2020 transfer function.
 */
export const rec2020LinearSlope = 4.5;
