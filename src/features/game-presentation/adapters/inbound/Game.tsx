import React from 'react';

import type { GameProps } from '../../../../types/gamePresentation';
import { GameRuntimeContext } from '../../composition/GameRuntimeContext';
import { useGameRuntime } from '../../composition/useGameRuntime';
import { GameField } from './GameField';

/*** Bind one serializable game definition to a local transient session and presentation field. */
export function Game(props: GameProps) {
  const runtime = useGameRuntime(props);

  return (
    <GameRuntimeContext.Provider value={runtime}>
      <GameField
        {...(props.aspectRatio === undefined ? {} : { aspectRatio: props.aspectRatio })}
        {...(props.minHeight === undefined ? {} : { minHeight: props.minHeight })}
        {...(props.clip === undefined ? {} : { clip: props.clip })}
        {...(props.accessibilityLabel === undefined
          ? {}
          : { accessibilityLabel: props.accessibilityLabel })}
        {...(props.testID === undefined ? {} : { testID: props.testID })}
      >
        {props.children}
      </GameField>
    </GameRuntimeContext.Provider>
  );
}
