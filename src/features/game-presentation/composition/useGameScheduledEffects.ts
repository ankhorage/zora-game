import { advanceGameTime, type GameDefinition, type GameInput } from '@ankhorage/game';
import React from 'react';

import type { GameRuntimeState } from '../../../types/gameRuntime';

type SetGameRuntime = React.Dispatch<React.SetStateAction<GameRuntimeState>>;

/*** Advance the nearest scheduled game effects through one platform timer. */
export function useGameScheduledEffects({
  enabled,
  definition,
  inputRef,
  runtime,
  runtimeKey,
  setRuntime,
}: UseGameScheduledEffectsArgs): void {
  React.useEffect(() => {
    if (!enabled || runtime.key !== runtimeKey) return undefined;
    const delayMs = resolveNextScheduledDelay(runtime);
    if (delayMs === undefined) return undefined;

    const startedAt = Date.now();
    const timer = setTimeout(() => {
      const elapsedMs = Math.max(0, Date.now() - startedAt);
      setRuntime((current) =>
        advanceScheduledRuntime({
          current,
          definition,
          elapsedMs,
          input: inputRef.current,
          runtimeKey,
        }),
      );
    }, delayMs);

    return () => clearTimeout(timer);
  }, [definition, enabled, inputRef, runtime, runtimeKey, setRuntime]);
}

interface UseGameScheduledEffectsArgs {
  readonly enabled: boolean;
  readonly definition: GameDefinition;
  readonly inputRef: React.RefObject<GameInput>;
  readonly runtime: GameRuntimeState;
  readonly runtimeKey: string;
  readonly setRuntime: SetGameRuntime;
}

interface AdvanceScheduledRuntimeArgs {
  readonly current: GameRuntimeState;
  readonly definition: GameDefinition;
  readonly elapsedMs: number;
  readonly input: GameInput;
  readonly runtimeKey: string;
}

/*** Advance one matching runtime state while preserving sessions that have already reset. */
function advanceScheduledRuntime({
  current,
  definition,
  elapsedMs,
  input,
  runtimeKey,
}: AdvanceScheduledRuntimeArgs): GameRuntimeState {
  if (current.key !== runtimeKey) return current;
  const result = advanceGameTime(definition, current.session, elapsedMs, input);
  return {
    key: runtimeKey,
    session: result.session,
    outputs: result.outputs,
    revision: current.revision + 1,
  };
}

/*** Resolve the nearest scheduled game consequence without owning domain timing rules. */
function resolveNextScheduledDelay(runtime: GameRuntimeState): number | undefined {
  return runtime.session.scheduled.reduce<number | undefined>((nearest, scheduled) => {
    if (nearest === undefined) return scheduled.remainingMs;
    return Math.min(nearest, scheduled.remainingMs);
  }, undefined);
}
