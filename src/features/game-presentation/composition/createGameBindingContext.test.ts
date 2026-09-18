import type { GameSession } from '@ankhorage/game';
import { mergeRuntimeRendererConfig, resolveRuntimeBindingValueSync } from '@ankhorage/runtime';
import { describe, expect, test } from 'bun:test';

import { createGameBindingContext } from './createGameBindingContext';

const session: GameSession = {
  definitionId: 'binding-demo',
  stageId: 'main',
  phase: 'playing',
  state: { health: 80, progress: 0.5 },
  entities: {
    player: {
      id: 'player',
      templateId: 'actor',
      state: { x: 42, y: 73, label: 'Player' },
    },
  },
  scheduled: [],
  elapsedMs: 120,
  sequence: 4,
};

describe('createGameBindingContext', () => {
  test('resolves ordinary Runtime context bindings from the local Game session', () => {
    const context = createGameBindingContext(session);

    expect(
      resolveRuntimeBindingValueSync(
        { source: { kind: 'context', path: 'game.session.entities.player.state.x' } },
        { context },
      ),
    ).toBe(42);
    expect(
      resolveRuntimeBindingValueSync(
        { source: { kind: 'context', path: 'game.session.state.health' } },
        { context },
      ),
    ).toBe(80);
  });

  test('preserves inherited context while replacing only the local game namespace', () => {
    const merged = mergeRuntimeRendererConfig(
      { bindingContext: createGameBindingContext(session) },
      {
        bindingContext: {
          route: { params: { id: 'demo' } },
          game: { session: { definitionId: 'outer' } },
        },
      },
    );

    expect(merged.bindingContext?.route).toEqual({ params: { id: 'demo' } });
    expect(merged.bindingContext?.game).toEqual({ session });
  });
});
