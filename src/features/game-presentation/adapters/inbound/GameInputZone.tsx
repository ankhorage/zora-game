import React from 'react';
import {
  StyleSheet,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';

import type { GameInputZoneProps } from '../../../../types/gamePresentation';
import { GameRuntimeContext } from '../../composition/GameRuntimeContext';
import { toGamePercentage } from '../../utils/toGamePercentage';
import { createGamePointerEvent } from './createGamePointerEvent';

interface MeasuredSize {
  readonly width: number;
  readonly height: number;
}

/*** Capture pointer/touch geometry and dispatch only normalized generic Game events. */
export function GameInputZone({
  eventType,
  entityId,
  x = 0,
  y = 0,
  width = 100,
  height = 100,
  zIndex = 0,
  enabled = true,
  continuous = true,
  accessibilityLabel,
  testID,
}: GameInputZoneProps) {
  const runtime = React.useContext(GameRuntimeContext);
  if (runtime === null) throw new Error('GameInputZone must be rendered inside Game.');

  const measuredSizeRef = React.useRef<MeasuredSize>({ width: 0, height: 0 });
  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { width: measuredWidth, height: measuredHeight } = event.nativeEvent.layout;
    measuredSizeRef.current = { width: measuredWidth, height: measuredHeight };
  }, []);

  const dispatchPointer = React.useCallback(
    (event: GestureResponderEvent) => {
      const gameEvent = createGamePointerEvent({
        eventType,
        ...(entityId === undefined ? {} : { entityId }),
        localX: event.nativeEvent.locationX,
        localY: event.nativeEvent.locationY,
        measuredWidth: measuredSizeRef.current.width,
        measuredHeight: measuredSizeRef.current.height,
        zoneX: x,
        zoneY: y,
        zoneWidth: width,
        zoneHeight: height,
      });
      if (gameEvent !== undefined) runtime.dispatch(gameEvent);
    },
    [entityId, eventType, height, runtime, width, x, y],
  );

  const shouldSetResponder = React.useCallback(() => enabled, [enabled]);

  return (
    <View
      {...(accessibilityLabel === undefined ? {} : { accessibilityLabel })}
      {...(testID === undefined ? {} : { testID })}
      {...(continuous
        ? { onResponderGrant: dispatchPointer, onResponderMove: dispatchPointer }
        : { onResponderRelease: dispatchPointer })}
      collapsable={false}
      onLayout={handleLayout}
      onStartShouldSetResponder={shouldSetResponder}
      pointerEvents={enabled ? 'auto' : 'none'}
      style={createInputZoneStyle({ x, y, width, height, zIndex })}
    />
  );
}

interface InputZoneStyleInput {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly zIndex: number;
}

/*** Convert field-relative input-zone props into one absolute React Native style. */
function createInputZoneStyle({ x, y, width, height, zIndex }: InputZoneStyleInput): ViewStyle {
  return {
    left: toGamePercentage(x),
    top: toGamePercentage(y),
    width: toGamePercentage(width),
    height: toGamePercentage(height),
    zIndex,
    ...styles.root,
  };
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
  },
});
