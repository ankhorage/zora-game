import { composeZoraPluginMetadata, ZORA_CORE_PLUGIN_METADATA } from '@ankhorage/zora/metadata';
import { describe, expect, test } from 'bun:test';

import { ZORA_PLUGIN_METADATA } from './ZORA_PLUGIN_METADATA';

describe('ZORA game plugin metadata', () => {
  test('makes Game and GameField embeddable in ordinary ZORA containers', () => {
    const catalog = composeZoraPluginMetadata([ZORA_CORE_PLUGIN_METADATA, ZORA_PLUGIN_METADATA]);
    const game = readComponentMeta(catalog.componentMeta.Game, 'Game');
    const gameField = readComponentMeta(catalog.componentMeta.GameField, 'GameField');
    const screen = readComponentMeta(catalog.componentMeta.Screen, 'Screen');
    const view = readComponentMeta(catalog.componentMeta.View, 'View');

    expect(screen.allowedChildren).toContain('Game');
    expect(view.allowedChildren).toContain('Game');
    expect(screen.allowedChildren).toContain('GameField');
    expect(view.allowedChildren).toContain('GameField');
    expect(gameField.allowedChildren).toContain('GameEntity');
    expect(gameField.allowedChildren).toContain('GameOverlay');
    expect(game.allowedChildren).toContain('GameEntity');
    expect(game.allowedChildren).toContain('GameInputZone');
    expect(game.allowedChildren).toContain('GameOverlay');
  });

  test('keeps Game input zones scoped to runtime-owning Game parents', () => {
    const catalog = composeZoraPluginMetadata([ZORA_CORE_PLUGIN_METADATA, ZORA_PLUGIN_METADATA]);
    const gameInputZone = readComponentMeta(catalog.componentMeta.GameInputZone, 'GameInputZone');

    expect(gameInputZone.props.eventType?.type).toBe('string');
    expect(gameInputZone.props.continuous?.type).toBe('boolean');
    expect(gameInputZone.props.keyboardBindings?.type).toBe('array');
    expect(gameInputZone.props.keyboardBindings?.itemSchema?.map(({ key }) => key)).toEqual([
      'key',
      'eventType',
      'entityId',
      'preventDefault',
    ]);
    expect(catalog.componentMeta.Game?.allowedChildren).toContain('GameInputZone');
    expect(catalog.componentMeta.GameField?.allowedChildren).not.toContain('GameInputZone');
  });

  test('describes bindable Game inputs and domain-neutral outputs', () => {
    const catalog = composeZoraPluginMetadata([ZORA_CORE_PLUGIN_METADATA, ZORA_PLUGIN_METADATA]);
    const game = readComponentMeta(catalog.componentMeta.Game, 'Game');

    expect(game.bindings?.props?.definition?.value.type).toBe('object');
    expect(game.bindings?.props?.input?.value.type).toBe('record');
    expect(game.events?.output?.eventType).toBe('game.output');
  });

  test('exposes GameEntity presentation props to canonical ZORA bindings', () => {
    const catalog = composeZoraPluginMetadata([ZORA_CORE_PLUGIN_METADATA, ZORA_PLUGIN_METADATA]);
    const gameEntity = readComponentMeta(catalog.componentMeta.GameEntity, 'GameEntity');

    expect(gameEntity.bindings?.props?.x?.value.type).toBe('number');
    expect(gameEntity.bindings?.props?.y?.value.type).toBe('number');
    expect(gameEntity.bindings?.props?.hidden?.value.type).toBe('boolean');
  });

  test('keeps the generic presentation vocabulary free of product-specific concepts', () => {
    const serialized = JSON.stringify(ZORA_PLUGIN_METADATA).toLowerCase();

    expect(serialized).not.toContain('palabichos');
    expect(serialized).not.toContain('vocabulary');
    expect(serialized).not.toContain('wordcreature');
    expect(serialized).not.toContain('letterprojectile');
  });
});

/*** Require one composed component metadata entry for focused assertions. */
function readComponentMeta<TValue>(value: TValue | undefined, name: string): TValue {
  if (value === undefined) throw new Error(`Missing composed component metadata for ${name}.`);
  return value;
}
