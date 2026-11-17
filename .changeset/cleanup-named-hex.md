---
"@auaust/jaune": minor
---

- Change `namedColors` from a `Set` to a frozen list of names
- Fix `namedColorToHex` returning inherited object members for names like `constructor`
- Fix `Color.fromHex` and `parseHex` throwing on invalid input; they return the fallback color
- Fix `Color.parse` and `parseColor` exposing a `Color` instance's writable channels
- Move the `ChannelRange` type to the random helpers
