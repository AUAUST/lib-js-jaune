---
"@auaust/jaune": patch
---

- Depend on `@auaust/toolkit` instead of `@auaust/primitive-kit`
- Add the `@auaust/jaune/color` entry
- Export the `utils` namespace, the `cache` and `channels` symbols, `isColorInstance` and the `ChannelRange`, `ColorTypeMap` and `ResolvedColorChannels` types from the root entry
- Accept an explicit `undefined` alpha channel in `ColorChannels`
