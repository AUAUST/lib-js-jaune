import type { Matrix3 } from "#space/types/Matrix3";

/**
 * Bradford chromatic adaptation from the D65 white point to D50, per CSS Color 4.
 */
export const bradfordD65ToD50: Matrix3 = [
  [1.04792_97925_44996_9, 0.02294_68706_01609_652, -0.05019_22662_89205_24],
  [0.02962_78087_70055_99, 0.99043_44267_53879_9, -0.01707_37990_63418_826],
  [-0.00924_30406_46204_504, 0.01505_51914_90298_152, 0.75187_42814_28137_1],
];

/**
 * Bradford chromatic adaptation from the D50 white point to D65, per CSS Color 4.
 */
export const bradfordD50ToD65: Matrix3 = [
  [0.95547_34214_88075, -0.02309_84549_48764_71, 0.06325_92432_00570_72],
  [-0.02836_97093_33863_7, 1.00999_53980_81304_1, 0.02104_14411_91917_323],
  [0.01231_40148_64481_998, -0.02050_76492_98898_964, 1.33036_59262_42124],
];
