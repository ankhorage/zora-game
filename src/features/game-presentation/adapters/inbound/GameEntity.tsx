import { View } from '@ankhorage/zora';
import { StyleSheet, type ViewStyle } from 'react-native';

import type { GameEntityProps } from '../../../../types/gamePresentation';

/*** Render one generic positioned game entity without owning gameplay semantics. */
export function GameEntity({
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
  accessibilityLabel,
  testID,
}: GameEntityProps) {
  return (
    <View
      {...(accessibilityLabel === undefined ? {} : { accessibilityLabel })}
      {...(testID === undefined ? {} : { testID })}
      pointerEvents={pointerEvents}
      style={[
        styles.root,
        createEntityStyle({ x, y, width, height, opacity, scale, rotation, zIndex, hidden }),
      ]}
    >
      {children}
    </View>
  );
}

interface GameEntityStyleInput {
  readonly x: number;
  readonly y: number;
  readonly width: number | undefined;
  readonly height: number | undefined;
  readonly opacity: number;
  readonly scale: number;
  readonly rotation: number;
  readonly zIndex: number;
  readonly hidden: boolean;
}

/*** Convert serializable entity presentation props into a React Native view style. */
function createEntityStyle({
  x,
  y,
  width,
  height,
  opacity,
  scale,
  rotation,
  zIndex,
  hidden,
}: GameEntityStyleInput): ViewStyle {
  return {
    display: hidden ? 'none' : 'flex',
    left: toPercent(x),
    opacity: clamp(opacity, 0, 1),
    position: 'absolute',
    top: toPercent(y),
    transform: [{ scale }, { rotate: `${rotation}deg` }],
    zIndex,
    ...(height === undefined ? {} : { height }),
    ...(width === undefined ? {} : { width }),
  };
}

/*** Convert a bounded percentage number to React Native percentage syntax. */
function toPercent(value: number): `${number}%` {
  return `${clamp(value, 0, 100)}%`;
}

/*** Clamp one numeric presentation value to an inclusive range. */
function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
  },
});
