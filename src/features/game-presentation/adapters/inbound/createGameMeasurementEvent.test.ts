import { describe, expect, test } from 'bun:test';

import type { GameMeasurementBounds } from '../../../../types/gameRuntime';
import { createGameMeasurementEvent } from './createGameMeasurementEvent';

const source: GameMeasurementBounds = {
  left: 20,
  right: 30,
  top: 40,
  bottom: 50,
  width: 10,
  height: 10,
};

const target: GameMeasurementBounds = {
  left: 25,
  right: 45,
  top: 45,
  bottom: 65,
  width: 20,
  height: 20,
};

describe('createGameMeasurementEvent', () => {
  test('reports raw source and target bounds without deciding collision semantics', () => {
    expect(
      createGameMeasurementEvent({
        eventType: 'geometry.sample',
        sourceId: 'projectile:1',
        targetId: 'player',
        source,
        target,
      }),
    ).toEqual({
      type: 'geometry.sample',
      entityId: 'projectile:1',
      payload: {
        sourceId: 'projectile:1',
        targetId: 'player',
        source,
        target,
      },
    });
  });

  test('allows the dispatched Game entity context to differ from the measured source id', () => {
    expect(
      createGameMeasurementEvent({
        eventType: 'geometry.sample',
        entityId: 'actor:1',
        sourceId: 'visual:1',
        targetId: 'player',
        source,
        target,
      }).entityId,
    ).toBe('actor:1');
  });
});
