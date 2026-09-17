import { View } from '@ankhorage/zora';
import { StyleSheet, type ViewStyle } from 'react-native';

import type { GameEntityProps } from '../../../../types/gamePresentation';
import { toGamePercentage } from '../../utils/toGamePercentage';

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
    left: toGamePercentage(x),
    opacity: Math.min(1, Math.max(0, opacity)),
    position: 'absolute',
    top: toGamePercentage(y),
    transform: [{ scale }, { rotate: `${rotation}deg` }],
    zIndex,
    ...(height === undefined ? {} : { height }),
    ...(width === undefined ? {} : { width }),
  };
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
  },
});
