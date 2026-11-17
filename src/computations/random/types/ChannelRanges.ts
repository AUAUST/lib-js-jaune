import type { ChannelRange } from "#computations/random/types/ChannelRange";

/**
 * A range per coordinate, in channel order; a missing one draws from the
 * channel's reference range.
 */
export type ChannelRanges = readonly [
  ChannelRange?,
  ChannelRange?,
  ChannelRange?,
];
