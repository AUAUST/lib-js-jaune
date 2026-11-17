import type { ColorSpace } from "#space/ports/ColorSpace";
import type { Coords } from "#space/types/Coords";

/**
 * A compact representation producers emit colors as, without allocating
 * a record per color.
 */
export interface ColorEncoding<T> {
  /**
   * The space `encode` receives coordinates in.
   */
  readonly space: ColorSpace;
  /**
   * Encodes `coords`, in `space`, with `alpha`; never retains `coords`, so
   * producers may reuse the tuple.
   */
  encode(coords: Coords, alpha: number): T;
}
