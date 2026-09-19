# @ankhorage/zora-game

## 0.8.2

### Patch Changes

- 6542bac: Update Ankhorage dependencies: `@ankhorage/game`, `@ankhorage/zora`.

## 0.8.1

### Patch Changes

- 4fd46db: Publish the basic embeddable game presentation example in generated Paradox README usage documentation.

## 0.8.0

### Minor Changes

- 7e35c6d: Add an optional fill layout mode to Game and GameField so full-screen games can use ordinary parent flex sizing without introducing a dedicated GameScreen runtime concept.

## 0.7.2

### Patch Changes

- 1c3f276: Add packed-package Expo 57, React Native, and React Native Web acceptance coverage to the package CI path.

## 0.7.1

### Patch Changes

- e264dd0: Update Ankhorage dependencies: `@ankhorage/runtime`, `@ankhorage/zora`.

## 0.7.0

### Minor Changes

- 44cdd1e: Add cross-platform GameEntity state transitions and relative one-shot/repeating motion timelines with
  reduced-motion handling, while keeping game-session semantics unchanged.

## 0.6.2

### Patch Changes

- 0f61a17: Update Ankhorage dependencies: `@ankhorage/runtime`, `@ankhorage/zora`.

## 0.6.1

### Patch Changes

- 467378d: Update Ankhorage dependencies: `@ankhorage/game`.

## 0.6.0

### Minor Changes

- 867360a: Add cross-platform measurable Game entities and a non-visual measurement probe that reports raw
  source/target bounds through the normal Game event path without deciding collision semantics.

## 0.5.0

### Minor Changes

- 16cf5a7: Add declarative web keyboard bindings to GameInputZone while preserving its existing native/mobile
  pointer and touch normalization path.

## 0.4.1

### Patch Changes

- bba6595: Expose the current local game entities as a repeatable binding array while preserving the canonical
  map-shaped GameSession entity storage.

## 0.4.0

### Minor Changes

- fd5e7c9: Expose each local Game session through the canonical Runtime binding context so ordinary ZORA props,
  including positioned entity, text, progress, and health presentation, can bind to game session data.

## 0.3.0

### Minor Changes

- ee7760c: Add a generic field-relative pointer and touch input-zone adapter that dispatches normalized events
  into the embeddable Game runtime without owning gameplay rules.

## 0.2.0

### Minor Changes

- f9e964f: Add the embeddable `Game` binder backed by the published `@ankhorage/game` runtime, local session
  state, scheduled-effect timing, ordinary ZORA placement metadata, and app-bindable game outputs.

## 0.1.0

### Minor Changes

- 5eb7739: Add the initial generic game presentation plugin with embeddable field, entity, and overlay primitives.

## 0.0.0

Initial package bootstrap. Future release entries are managed by Changesets.
