# Components

## Game

Source: `src/features/game-presentation/adapters/inbound/Game.tsx:12:1`

Bind one serializable game definition to a local transient session and presentation field.

Export paths: `src/index.ts`

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| accessibilityLabel | `string \| undefined` | no | — |  |
| aspectRatio | `number \| undefined` | no | — |  |
| autoAdvanceTime | `boolean \| undefined` | no | — |  |
| children | `React.ReactNode \| undefined` | no | — |  |
| clip | `boolean \| undefined` | no | — |  |
| definition | `GameDefinition` | yes | — |  |
| fill | `boolean \| undefined` | no | — |  |
| input | `GameInput \| undefined` | no | — |  |
| minHeight | `number \| undefined` | no | — |  |
| onOutput | `(output: GameOutput) => void \| undefined` | no | — |  |
| resetKey | `string \| undefined` | no | — |  |
| seed | `number \| undefined` | no | — |  |
| testID | `string \| undefined` | no | — |  |

## GameEntity

Source: `src/features/game-presentation/adapters/inbound/GameEntity.tsx:9:1`

Render one generic positioned game entity without owning gameplay semantics.

Export paths: `src/index.ts`

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| accessibilityLabel | `string \| undefined` | no | — |  |
| children | `React.ReactNode \| undefined` | no | — |  |
| height | `number \| undefined` | no | — |  |
| hidden | `boolean \| undefined` | no | — |  |
| measurementId | `string \| undefined` | no | — |  |
| motionAlternate | `boolean \| undefined` | no | — |  |
| motionDelayMs | `number \| undefined` | no | — |  |
| motionDurationMs | `number \| undefined` | no | — |  |
| motionEasing | `GameEntityEasing \| undefined` | no | — |  |
| motionEssential | `boolean \| undefined` | no | — |  |
| motionOffsetX | `number \| undefined` | no | — |  |
| motionOffsetY | `number \| undefined` | no | — |  |
| motionOpacityDelta | `number \| undefined` | no | — |  |
| motionPaused | `boolean \| undefined` | no | — |  |
| motionRepeat | `boolean \| undefined` | no | — |  |
| motionRotationDelta | `number \| undefined` | no | — |  |
| motionScaleDelta | `number \| undefined` | no | — |  |
| opacity | `number \| undefined` | no | — |  |
| pointerEvents | `GamePointerEvents \| undefined` | no | — |  |
| rotation | `number \| undefined` | no | — |  |
| scale | `number \| undefined` | no | — |  |
| testID | `string \| undefined` | no | — |  |
| transitionDurationMs | `number \| undefined` | no | — |  |
| transitionEasing | `GameEntityEasing \| undefined` | no | — |  |
| width | `number \| undefined` | no | — |  |
| x | `number \| undefined` | no | — |  |
| y | `number \| undefined` | no | — |  |
| zIndex | `number \| undefined` | no | — |  |

## GameField

Source: `src/features/game-presentation/adapters/inbound/GameField.tsx:7:1`

Render a bounded relative-positioning surface for game presentation content.

Export paths: `src/index.ts`

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| accessibilityLabel | `string \| undefined` | no | — |  |
| aspectRatio | `number \| undefined` | no | — |  |
| children | `React.ReactNode \| undefined` | no | — |  |
| clip | `boolean \| undefined` | no | `true` |  |
| fill | `boolean \| undefined` | no | `false` |  |
| minHeight | `number \| undefined` | no | `240` |  |
| testID | `string \| undefined` | no | — |  |

## GameInputZone

Source: `src/features/game-presentation/adapters/inbound/GameInputZone.tsx:8:1`

Capture pointer/touch geometry and optional keyboard input as normalized generic Game events.

Export paths: `src/index.ts`

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| accessibilityLabel | `string \| undefined` | no | — |  |
| continuous | `boolean \| undefined` | no | `true` |  |
| enabled | `boolean \| undefined` | no | `true` |  |
| entityId | `string \| undefined` | no | — |  |
| eventType | `string` | yes | — |  |
| height | `number \| undefined` | no | `100` |  |
| keyboardBindings | `readonly GameKeyboardBinding[] \| undefined` | no | — |  |
| testID | `string \| undefined` | no | — |  |
| width | `number \| undefined` | no | `100` |  |
| x | `number \| undefined` | no | `0` |  |
| y | `number \| undefined` | no | `0` |  |
| zIndex | `number \| undefined` | no | `0` |  |

## GameOverlay

Source: `src/features/game-presentation/adapters/inbound/GameOverlay.tsx:7:1`

Render an absolute game presentation layer for HUD, feedback, and phase content.

Export paths: `src/index.ts`

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| accessibilityLabel | `string \| undefined` | no | — |  |
| blocking | `boolean \| undefined` | no | `false` |  |
| children | `React.ReactNode \| undefined` | no | — |  |
| padding | `number \| undefined` | no | `0` |  |
| placement | `GameOverlayPlacement \| undefined` | no | `'fill'` |  |
| testID | `string \| undefined` | no | — |  |
