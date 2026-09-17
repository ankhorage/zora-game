import {
  advanceGameTime,
  applyGameEvent,
  createGameSession,
  type GameInput,
  type GameOutput,
} from '@ankhorage/game';
import React from 'react';

import type { GameProps } from '../../../../types/gamePresentation';
import type { GameRuntimeState } from '../../../../types/gameRuntime';
import { GameRuntimeContext } from '../../composition/GameRuntimeContext';
import { GameField } from './GameField';

const EMPTY_GAME_INPUT: GameInput = {};

/*** Bind one serializable game definition to a local transient session and presentation field. */
export function Game({
  definition,
  input = EMPTY_GAME_INPUT,
  seed = 0,
  resetKey = '',
  autoAdvanceTime = true,
  onOutput,
  children,
  ...fieldProps
}: GameProps) {
  const inputRef = React.useRef(input);
  const outputRef = React.useRef(onOutput);
  inputRef.current = input;
  outputRef.current = onOutput;

  const runtimeKey = createRuntimeKey(definition.id, resetKey, seed);
  const [runtime, setRuntime] = React.useState<GameRuntimeState>(() =>
    createRuntimeState(definition, input, seed, runtimeKey, 0),
  );

  React.useEffect(() => {
    setRuntime((current) =>
      current.key === runtimeKey
        ? current
        : createRuntimeState(definition, inputRef.current, seed, runtimeKey, current.revision + 1),
    );
  }, [definition, runtimeKey, seed]);

  React.useEffect(() => {
    emitGameOutputs(runtime.outputs, outputRef.current);
  }, [runtime.outputs, runtime.revision]);

  const dispatch = React.useCallback(
    (event: Parameters<typeof applyGameEvent>[2]) => {
      setRuntime((current) => {
        const base =
          current.key === runtimeKey
            ? current
            : createRuntimeState(
                definition,
                inputRef.current,
                seed,
                runtimeKey,
                current.revision,
              );
        const result = applyGameEvent(definition, base.session, event, inputRef.current);
        return {
          key: runtimeKey,
          session: result.session,
          outputs: [...(base === current ? [] : base.outputs), ...result.outputs],
          revision: current.revision + 1,
        };
      });
    },
    [definition, runtimeKey, seed],
  );

  React.useEffect(() => {
    if (!autoAdvanceTime || runtime.key !== runtimeKey) return undefined;
    const delayMs = resolveNextScheduledDelay(runtime.session);
    if (delayMs === undefined) return undefined;

    const startedAt = Date.now();
    const timer = setTimeout(() => {
      const elapsedMs = Math.max(0, Date.now() - startedAt);
      setRuntime((current) => {
        if (current.key !== runtimeKey) return current;
        const result = advanceGameTime(
          definition,
          current.session,
          elapsedMs,
          inputRef.current,
        );
        return {
          key: runtimeKey,
          session: result.session,
          outputs: result.outputs,
          revision: current.revision + 1,
        };
      });
    }, delayMs);

    return () => clearTimeout(timer);
  }, [autoAdvanceTime, definition, runtime.key, runtime.session, runtimeKey]);

  const context = React.useMemo(
    () => ({ session: runtime.session, dispatch }),
    [dispatch, runtime.session],
  );

  return (
    <GameRuntimeContext.Provider value={context}>
      <GameField {...fieldProps}>{children}</GameField>
    </GameRuntimeContext.Provider>
  );
}

/*** Create one runtime identity from serializable definition/session initialization inputs. */
function createRuntimeKey(definitionId: string, resetKey: string, seed: number): string {
  return `${definitionId}:${resetKey}:${seed}`;
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

/*** Emit runtime outputs through the ZORA event callback boundary. */
function emitGameOutputs(
  outputs: readonly GameOutput[],
  onOutput: GameProps['onOutput'],
): void {
  if (onOutput === undefined) return;
  outputs.forEach((output) => onOutput(output));
}

/*** Resolve the nearest scheduled game consequence without owning domain timing rules. */
function resolveNextScheduledDelay(session: GameRuntimeState['session']): number | undefined {
  return session.scheduled.reduce<number | undefined>((nearest, scheduled) => {
    if (nearest === undefined) return scheduled.remainingMs;
    return Math.min(nearest, scheduled.remainingMs);
  }, undefined);
}
