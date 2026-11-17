import type { BlendMode } from "#computations/composite/types/BlendMode";
import type { ColorSpace } from "#space/ports/ColorSpace";

/**
 * How `composite` paints a source over a backdrop.
 */
export interface CompositeOptions {
  /**
   * The blend mode applied before compositing.
   */
  readonly blend?: BlendMode | undefined;
  /**
   * The RGB space compositing runs in, and the space of the result.
   */
  readonly space?: ColorSpace | undefined;
}
