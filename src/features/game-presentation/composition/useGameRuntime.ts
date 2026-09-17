import {
  advanceGameTime,
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
  const definitionRef = useLatestValue(definition);
  const inputRef = useLatestValue(input);
  const outputRef = useLatestValue(props.onOutput);
  const autoAdvanceTimeRef = useLatestValue(props.autoAdvanceTime ?? true);
  const clockRef = React.useRef(Date.now());
  const runtimeKey = createRuntimeKey(definition.id, resetKey, seed);
  const [runtime, setRuntime] = React.useState<GameRuntimeState>(() =>
    createRuntimeState(definition, input, seed, runtimeKey, 0),
  );

  React.useEffect(() => {
    clockRef.current = Date.now();
    setRuntime((current) =>
      current.key === runtimeKey
        ? current
        : createRuntimeState(
            definitionRef.current,
            inputRef.current,
            seed,
            runtimeKey,
            current.revision + 1,
          ),
    );
  }, [definitionRef, inputRef, runtimeKey, seed]);

  React.useEffect(() => {
    emitGameOutputs(runtime.outputs, outputRef.current);
  }, [outputRef, runtime.outputs, runtime.revision]);

  const dispatch = React.useCallback<GameRuntimeContextValue['dispatch']>(
    (event) => {
      const now = Date.now();
      setRuntime((current) =>
        applyRuntimeEvent({
          autoAdvanceTime: autoAdvanceTimeRef.current,
          current,
          definition: definitionRef.current,
          elapsedMs: Math.max(0, now - clockRef.current),
          event,
          input: inputRef.current,
          runtimeKey,
          seed,
        }),
      );
      clockRef.current = now;
    },
    [autoAdvanceTimeRef, definitionRef, inputRef, runtimeKey, seed],
  );

  useGameScheduledEffects({
    clockRef,
    definitionRef,
    enabled: autoAdvanceTimeRef.current,
    inputRef,
    runtimeKey,
    scheduled: runtime.session.scheduled,
    setRuntime,
  });

  return React.useMemo(() => ({ session: runtime.session, dispatch }), [dispatch, runtime.session]);
}

interface ApplyRuntimeEventArgs {
  readonly autoAdvanceTime: boolean;
  readonly current: GameRuntimeState;
  readonly definition: GameProps['definition'];
  readonly elapsedMs: number;
  readonly event: Parameters<typeof applyGameEvent>[2];
  readonly input: GameInput;
  readonly runtimeKey: string;
  readonly seed: number;
}

/*** Apply elapsed time and one explicit game event against the matching local session. */
function applyRuntimeEvent(args: ApplyRuntimeEventArgs): GameRuntimeState {
  const base =
    args.current.key === args.runtimeKey
      ? args.current
      : createRuntimeState(args.definition, args.input, args.seed, args.runtimeKey, args.current.revision);
  const timed = args.autoAdvanceTime
    ? advanceGameTime(args.definition, base.session, args.elapsedMs, args.input)
    : { session: base.session, outputs: [] };
  const result = applyGameEvent(args.definition, timed.session, args.event, args.input);
  return {
    key: args.runtimeKey,
    session: result.session,
    outputs: [
      ...(base === args.current ? [] : base.outputs),
      ...timed.outputs,
      ...result.outputs,
    ],
    revision: args.current.revision + 1,
  };
}

/*** Create one transient runtime state through the published Game owner API. */
function createRuntimeState(
  definition: GameProps['definition'],
  input: GameInput,
  seed: number,
  key: string,
  revision: number,
): GameRuntimeState {
  const result = createGameSession(definition, { input, seed });
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
