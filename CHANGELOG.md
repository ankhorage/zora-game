# @ankhorage/zora-game

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
