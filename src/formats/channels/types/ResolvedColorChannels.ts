import type { ColorChannels } from "#formats/channels/types/ColorChannels";

/**
 * Channels as normalization returns them: every field set and the alpha
 * channel resolved.
 */
export interface ResolvedColorChannels extends Required<ColorChannels> {
  readonly a: number;
}
