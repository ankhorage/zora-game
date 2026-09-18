import React from 'react';
import { Animated, StyleSheet, View, type ViewStyle } from 'react-native';

import type { GameEntityProps } from '../../../../types/gamePresentation';
import { GameRuntimeContext } from '../../composition/GameRuntimeContext';
import { useGameEntityAnimatedStyle } from '../../utils/useGameEntityAnimatedStyle';
import { measureGameEntity } from './measureGameEntity';

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
  measurementId,
  transitionDurationMs,
  transitionEasing,
  motionOffsetX,
  motionOffsetY,
  motionOpacityDelta,
  motionScaleDelta,
  motionRotationDelta,
  motionDurationMs,
  motionDelayMs,
  motionEasing,
  motionRepeat,
  motionAlternate,
  motionPaused,
  motionEssential,
  accessibilityLabel,
  testID,
}: GameEntityProps) {
  const elementRef = React.useRef<View | null>(null);
  const runtime = React.useContext(GameRuntimeContext);
  const registerMeasurement = runtime?.registerMeasurement;
  const animatedStyle = useGameEntityAnimatedStyle({
    x,
    y,
    opacity,
    scale,
    rotation,
    ...(transitionDurationMs === undefined ? {} : { transitionDurationMs }),
    ...(transitionEasing === undefined ? {} : { transitionEasing }),
    ...(motionOffsetX === undefined ? {} : { motionOffsetX }),
    ...(motionOffsetY === undefined ? {} : { motionOffsetY }),
    ...(motionOpacityDelta === undefined ? {} : { motionOpacityDelta }),
    ...(motionScaleDelta === undefined ? {} : { motionScaleDelta }),
    ...(motionRotationDelta === undefined ? {} : { motionRotationDelta }),
    ...(motionDurationMs === undefined ? {} : { motionDurationMs }),
    ...(motionDelayMs === undefined ? {} : { motionDelayMs }),
    ...(motionEasing === undefined ? {} : { motionEasing }),
    ...(motionRepeat === undefined ? {} : { motionRepeat }),
    ...(motionAlternate === undefined ? {} : { motionAlternate }),
    ...(motionPaused === undefined ? {} : { motionPaused }),
    ...(motionEssential === undefined ? {} : { motionEssential }),
  });

  React.useEffect(() => {
    if (measurementId === undefined || registerMeasurement === undefined) return undefined;
    return registerMeasurement(measurementId, () => measureGameEntity(elementRef.current));
  }, [measurementId, registerMeasurement]);

  return (
    <Animated.View
      ref={elementRef}
      {...(accessibilityLabel === undefined ? {} : { accessibilityLabel })}
      {...(testID === undefined ? {} : { testID })}
      pointerEvents={pointerEvents}
      style={[
        styles.root,
        createEntityStaticStyle({ width, height, zIndex, hidden }),
        animatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
}

interface GameEntityStaticStyleInput {
  readonly width: number | undefined;
  readonly height: number | undefined;
  readonly zIndex: number;
  readonly hidden: boolean;
}

/*** Convert non-animated GameEntity presentation props into a React Native view style. */
function createEntityStaticStyle({
  width,
  height,
  zIndex,
  hidden,
}: GameEntityStaticStyleInput): ViewStyle {
  return {
    display: hidden ? 'none' : 'flex',
    position: 'absolute',
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
