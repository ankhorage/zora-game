import type { GameEvent, GameSession } from '@ankhorage/game';

export interface GameRuntimeContextValue {
  readonly session: GameSession;
  readonly dispatch: (event: GameEvent) => void;
}

export interface GameRuntimeState {
  readonly key: string;
  readonly session: GameSession;
  readonly outputs: readonly import('@ankhorage/game').GameOutput[];
  readonly revision: number;
}
