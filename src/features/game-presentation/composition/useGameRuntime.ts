import {
  applyGameEvent,
  createGameSession,
  type GameInput,
  type GameOutput,
} from '@ankhorage/game';
import React from 'react';

import type { GameProps } from '../../../types/gamePresentation';
import type { GameRuntimeContextValue, GameRuntimeState } from '../../../types/gameRuntime';
import { useGameScheduledEffects } from './useGameScheduledEffects';

const EMPTY_GAME_INPUT: GameInput = {};

/*** Own one local transient Game session while delegating all domain transitions to @ankhorage/game. */
export function useGameRuntime(props: GameProps): GameRuntimeContextValue {
  const { definition, input = EMPTY_GAME_INPUT, seed = 0, resetKey = '' } = props;
  const inputRef = useLatestValue(input);
  const outputRef = useLatestValue(props.onOutput);
  const runtimeKey = createRuntimeKey(definition.id, resetKey, seed);
  const [runtime, setRuntime] = React.useState<GameRuntimeState>(() =>
    createRuntimeState(props, input, runtimeKey, 0),
  );

  React.useEffect(() => {
    setRuntime((current) =>
      current.key === runtimeKey
        ? current
        : createRuntimeState(props, inputRef.current, runtimeKey, current.revision + 1),
    );
  }, [inputRef, props, runtimeKey]);

  React.useEffect(() => {
    emitGameOutputs(runtime.outputs, outputRef.current);
  }, [outputRef, runtime.outputs, runtime.revision]);

  const dispatch = React.useCallback<GameRuntimeContextValue['dispatch']>(
    (event) => {
      setRuntime((current) =>
        applyRuntimeEvent({
          current,
          definition,
          event,
          input: inputRef.current,
          props,
          runtimeKey,
        }),
      );
    },
    [definition, inputRef, props, runtimeKey],
  );

  useGameScheduledEffects({
    enabled: props.autoAdvanceTime ?? true,
    definition,
    inputRef,
    runtime,
    runtimeKey,
    setRuntime,
  });

  return React.useMemo(() => ({ session: runtime.session, dispatch }), [dispatch, runtime.session]);
}

interface ApplyRuntimeEventArgs {
  readonly current: GameRuntimeState;
  readonly definition: GameProps['definition'];
  readonly event: Parameters<typeof applyGameEvent>[2];
  readonly input: GameInput;
  readonly props: GameProps;
  readonly runtimeKey: string;
}

/*** Apply one explicit game event against the matching local session. */
function applyRuntimeEvent({
  current,
  definition,
  event,
  input,
  props,
  runtimeKey,
}: ApplyRuntimeEventArgs): GameRuntimeState {
  const base =
    current.key === runtimeKey
      ? current
      : createRuntimeState(props, input, runtimeKey, current.revision);
  const result = applyGameEvent(definition, base.session, event, input);
  return {
    key: runtimeKey,
    session: result.session,
    outputs: [...(base === current ? [] : base.outputs), ...result.outputs],
    revision: current.revision + 1,
  };
}

/*** Create one transient runtime state through the published Game owner API. */
function createRuntimeState(
  props: GameProps,
  input: GameInput,
  key: string,
  revision: number,
): GameRuntimeState {
  const result = createGameSession(props.definition, { input, seed: props.seed ?? 0 });
  return { key, session: result.session, outputs: result.outputs, revision };
}

/*** Create one runtime identity from serializable definition/session initialization inputs. */
function createRuntimeKey(definitionId: string, resetKey: string, seed: number): string {
  return `${definitionId}:${resetKey}:${seed}`;
}

/*** Emit runtime outputs through the ZORA event callback boundary. */
function emitGameOutputs(outputs: readonly GameOutput[], onOutput: GameProps['onOutput']): void {
  if (onOutput === undefined) return;
  outputs.forEach((output) => onOutput(output));
}

/*** Keep a stable ref object updated with the latest adapter input. */
function useLatestValue<TValue>(value: TValue): React.RefObject<TValue> {
  const ref = React.useRef(value);
  ref.current = value;
  return ref;
}
