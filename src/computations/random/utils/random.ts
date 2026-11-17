import { randomAlphaChannel } from "#computations/random/utils/randomAlphaChannel";
import { randomRgbChannel } from "#computations/random/utils/randomRgbChannel";
import { toColorChannels, type ColorChannels } from "#formats/channels/index";
import type { ChannelRange } from "#computations/random/types/ChannelRange";

/**
 * Generates a random color.
 *
 * Specific values or ranges can be provided for each channel. If a range is
 * provided, the value will be randomly selected from within that range. If a
 * single value is provided, that value will be used for the channel. If no value
 * is provided, the channel will be randomly selected from 0 to 255 for RGB
 * channels and be set to 1 for the alpha channel.
 */
export function random({
  r,
  g,
  b,
  a,
}: {
  r?: ChannelRange;
  g?: ChannelRange;
  b?: ChannelRange;
  a?: ChannelRange;
} = {}): ColorChannels {
  return toColorChannels(
    randomRgbChannel(r),
    randomRgbChannel(g),
    randomRgbChannel(b),
    randomAlphaChannel(a),
  );
}
