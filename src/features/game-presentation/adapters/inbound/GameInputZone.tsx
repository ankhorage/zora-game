import { StyleSheet, View, type ViewStyle } from 'react-native';

import type { GameInputZoneProps } from '../../../../types/gamePresentation';
import { toGamePercentage } from '../../utils/toGamePercentage';
import { useGameInputZoneResponder } from './useGameInputZoneResponder';

/*** Capture pointer/touch geometry and dispatch only normalized generic Game events. */
export function GameInputZone({
  x = 0,
  y = 0,
  width = 100,
  height = 100,
  zIndex = 0,
  enabled = true,
  continuous = true,
  accessibilityLabel,
  testID,
  ...inputProps
}: GameInputZoneProps) {
  const { dispatchPointer, handleLayout, shouldSetResponder } = useGameInputZoneResponder({
    ...inputProps,
    x,
    y,
    width,
    height,
    enabled,
    continuous,
  });

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
