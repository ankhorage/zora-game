import React from 'react';
import type { GestureResponderEvent, LayoutChangeEvent } from 'react-native';

import type { GameInputZoneProps } from '../../../../types/gamePresentation';
import { GameRuntimeContext } from '../../composition/GameRuntimeContext';
import { createGamePointerEvent } from './createGamePointerEvent';

interface MeasuredSize {
  readonly width: number;
  readonly height: number;
}

/*** Own React Native responder measurement and event dispatch for one Game input zone. */
export function useGameInputZoneResponder(props: GameInputZoneProps) {
  const runtime = React.useContext(GameRuntimeContext);
  if (runtime === null) throw new Error('GameInputZone must be rendered inside Game.');

  const measuredSizeRef = React.useRef<MeasuredSize>({ width: 0, height: 0 });
  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    measuredSizeRef.current = { width, height };
  }, []);

  const dispatchPointer = React.useCallback(
    (event: GestureResponderEvent) => {
      const measured = measuredSizeRef.current;
      const gameEvent = createGamePointerEvent({
        eventType: props.eventType,
        ...(props.entityId === undefined ? {} : { entityId: props.entityId }),
        localX: event.nativeEvent.locationX,
        localY: event.nativeEvent.locationY,
        measuredWidth: measured.width,
        measuredHeight: measured.height,
        zoneX: props.x ?? 0,
        zoneY: props.y ?? 0,
        zoneWidth: props.width ?? 100,
        zoneHeight: props.height ?? 100,
      });
      if (gameEvent !== undefined) runtime.dispatch(gameEvent);
    },
    [props.entityId, props.eventType, props.height, props.width, props.x, props.y, runtime],
  );

  return {
    dispatchPointer,
    handleLayout,
    shouldSetResponder: () => props.enabled ?? true,
  };
}
