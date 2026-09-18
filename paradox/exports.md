# Public API

## Game

Kind: `function`
Module: `src/features/game-presentation/adapters/inbound/Game.tsx`
Source: `src/features/game-presentation/adapters/inbound/Game.tsx:12:1`

Bind one serializable game definition to a local transient session and presentation field.

### Signatures

- `(props: GameProps) => React.JSX.Element`
  - props: `GameProps`
  - returns: `React.JSX.Element`

## GameEntity

Kind: `function`
Module: `src/features/game-presentation/adapters/inbound/GameEntity.tsx`
Source: `src/features/game-presentation/adapters/inbound/GameEntity.tsx:10:1`

Render one generic positioned game entity without owning gameplay semantics.

### Signatures

- `({
  children,
  x = 0,
  y = 0,
  width,
  height,
  opacity = 1,
  scale = 1,
  rotation = 0,
  zIndex = 0,
  hidden = false,
  pointerEvents = 'auto',
  measurementId,
  accessibilityLabel,
  testID,
}: GameEntityProps) => React.JSX.Element`
  - {
  children,
  x = 0,
  y = 0,
  width,
  height,
  opacity = 1,
  scale = 1,
  rotation = 0,
  zIndex = 0,
  hidden = false,
  pointerEvents = 'auto',
  measurementId,
  accessibilityLabel,
  testID,
}: `GameEntityProps`
  - returns: `React.JSX.Element`

## GameEntityProps

Kind: `type`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:19:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accessibilityLabel | property | `string` | no |  |
| children | property | `React.ReactNode` | no |  |
| height | property | `number` | no |  |
| hidden | property | `boolean` | no |  |
| measurementId | property | `string` | no |  |
| opacity | property | `number` | no |  |
| pointerEvents | property | `GamePointerEvents` | no |  |
| rotation | property | `number` | no |  |
| scale | property | `number` | no |  |
| testID | property | `string` | no |  |
| width | property | `number` | no |  |
| x | property | `number` | no |  |
| y | property | `number` | no |  |
| zIndex | property | `number` | no |  |

## GameField

Kind: `function`
Module: `src/features/game-presentation/adapters/inbound/GameField.tsx`
Source: `src/features/game-presentation/adapters/inbound/GameField.tsx:7:1`

Render a bounded relative-positioning surface for game presentation content.

### Signatures

- `({
  children,
  aspectRatio,
  minHeight = 240,
  clip = true,
  accessibilityLabel,
  testID,
}: GameFieldProps) => import("react").JSX.Element`
  - {
  children,
  aspectRatio,
  minHeight = 240,
  clip = true,
  accessibilityLabel,
  testID,
}: `GameFieldProps`
  - returns: `import("react").JSX.Element`

## GameFieldProps

Kind: `type`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:10:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accessibilityLabel | property | `string` | no |  |
| aspectRatio | property | `number` | no |  |
| children | property | `React.ReactNode` | no |  |
| clip | property | `boolean` | no |  |
| minHeight | property | `number` | no |  |
| testID | property | `string` | no |  |

## GameInputZone

Kind: `function`
Module: `src/features/game-presentation/adapters/inbound/GameInputZone.tsx`
Source: `src/features/game-presentation/adapters/inbound/GameInputZone.tsx:8:1`

Capture pointer/touch geometry and optional keyboard input as normalized generic Game events.

### Signatures

- `({
  x = 0,
  y = 0,
  width = 100,
  height = 100,
  zIndex = 0,
  enabled = true,
  continuous = true,
  keyboardBindings,
  accessibilityLabel,
  testID,
  ...inputProps
}: GameInputZoneProps) => import("react").JSX.Element`
  - {
  x = 0,
  y = 0,
  width = 100,
  height = 100,
  zIndex = 0,
  enabled = true,
  continuous = true,
  keyboardBindings,
  accessibilityLabel,
  testID,
  ...inputProps
}: `GameInputZoneProps`
  - returns: `import("react").JSX.Element`

## GameInputZoneProps

Kind: `type`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:43:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accessibilityLabel | property | `string` | no |  |
| continuous | property | `boolean` | no |  |
| enabled | property | `boolean` | no |  |
| entityId | property | `string` | no |  |
| eventType | property | `string` | yes |  |
| height | property | `number` | no |  |
| keyboardBindings | property | `readonly GameKeyboardBinding[]` | no |  |
| testID | property | `string` | no |  |
| width | property | `number` | no |  |
| x | property | `number` | no |  |
| y | property | `number` | no |  |
| zIndex | property | `number` | no |  |

## GameKeyboardBinding

Kind: `type`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:36:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| entityId | property | `string` | no |  |
| eventType | property | `string` | no |  |
| key | property | `string` | yes |  |
| preventDefault | property | `boolean` | no |  |

## GameMeasurementProbe

Kind: `function`
Module: `src/features/game-presentation/adapters/inbound/GameMeasurementProbe.tsx`
Source: `src/features/game-presentation/adapters/inbound/GameMeasurementProbe.tsx:9:1`

Measure two registered game entities and dispatch only their raw rendered geometry.

### Signatures

- `({
  sourceId,
  targetId,
  eventType = 'game.measurement',
  entityId,
  delayMs = 0,
  enabled = true,
}: GameMeasurementProbeProps) => null`
  - {
  sourceId,
  targetId,
  eventType = 'game.measurement',
  entityId,
  delayMs = 0,
  enabled = true,
}: `GameMeasurementProbeProps`
  - returns: `null`

## GameMeasurementProbeProps

Kind: `type`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:58:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| delayMs | property | `number` | no |  |
| enabled | property | `boolean` | no |  |
| entityId | property | `string` | no |  |
| eventType | property | `string` | no |  |
| sourceId | property | `string` | yes |  |
| targetId | property | `string` | yes |  |

## GameOverlay

Kind: `function`
Module: `src/features/game-presentation/adapters/inbound/GameOverlay.tsx`
Source: `src/features/game-presentation/adapters/inbound/GameOverlay.tsx:7:1`

Render an absolute game presentation layer for HUD, feedback, and phase content.

### Signatures

- `({
  children,
  placement = 'fill',
  blocking = false,
  padding = 0,
  accessibilityLabel,
  testID,
}: GameOverlayProps) => import("react").JSX.Element`
  - {
  children,
  placement = 'fill',
  blocking = false,
  padding = 0,
  accessibilityLabel,
  testID,
}: `GameOverlayProps`
  - returns: `import("react").JSX.Element`

## GameOverlayPlacement

Kind: `unknown`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:7:1`

## GameOverlayProps

Kind: `type`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:67:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accessibilityLabel | property | `string` | no |  |
| blocking | property | `boolean` | no |  |
| children | property | `React.ReactNode` | no |  |
| padding | property | `number` | no |  |
| placement | property | `GameOverlayPlacement` | no |  |
| testID | property | `string` | no |  |

## GamePointerEvents

Kind: `unknown`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:6:1`

## GameProps

Kind: `type`
Module: `src/types/gamePresentation.ts`
Source: `src/types/gamePresentation.ts:76:1`

### Members

| Name | Kind | Type | Required | Description |
| --- | --- | --- | --- | --- |
| accessibilityLabel | property | `string` | no |  |
| aspectRatio | property | `number` | no |  |
| autoAdvanceTime | property | `boolean` | no |  |
| children | property | `React.ReactNode` | no |  |
| clip | property | `boolean` | no |  |
| definition | property | `GameDefinition` | yes |  |
| input | property | `Readonly<Record<string, import("@ankhorage/game").GameValue>>` | no |  |
| minHeight | property | `number` | no |  |
| onOutput | property | `(output: GameOutput) => void` | no |  |
| resetKey | property | `string` | no |  |
| seed | property | `number` | no |  |
| testID | property | `string` | no |  |

## ZORA_GAME_COMPONENT_META

Kind: `value`
Module: `src/ZORA_GAME_COMPONENT_META.ts`
Source: `src/ZORA_GAME_COMPONENT_META.ts:9:14`

Register the generic game presentation metadata owned by this package.

## ZORA_GAME_PLUGIN

Kind: `value`
Module: `src/ZORA_GAME_PLUGIN.ts`
Source: `src/ZORA_GAME_PLUGIN.ts:10:14`

Expose the runtime component registry together with metadata for ZORA plugin consumers.

## ZORA_PLUGIN_METADATA

Kind: `value`
Module: `src/ZORA_PLUGIN_METADATA.ts`
Source: `src/ZORA_PLUGIN_METADATA.ts:6:14`

Describe generic game presentation nodes and their valid ZORA extension hosts.
