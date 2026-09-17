import { composeZoraPluginMetadata, ZORA_CORE_PLUGIN_METADATA } from '@ankhorage/zora/metadata';
import { describe, expect, test } from 'bun:test';

import { ZORA_PLUGIN_METADATA } from './ZORA_PLUGIN_METADATA';

describe('ZORA game plugin metadata', () => {
  test('makes Game and GameField embeddable in ordinary ZORA containers', () => {
    const catalog = composeZoraPluginMetadata([ZORA_CORE_PLUGIN_METADATA, ZORA_PLUGIN_METADATA]);

    expect(catalog.componentMeta.Screen?.allowedChildren).toContain('Game');
    expect(catalog.componentMeta.View?.allowedChildren).toContain('Game');
    expect(catalog.componentMeta.Screen?.allowedChildren).toContain('GameField');
    expect(catalog.componentMeta.View?.allowedChildren).toContain('GameField');
    expect(catalog.componentMeta.GameField?.allowedChildren).toContain('GameEntity');
    expect(catalog.componentMeta.GameField?.allowedChildren).toContain('GameOverlay');
    expect(catalog.componentMeta.Game?.allowedChildren).toContain('GameEntity');
    expect(catalog.componentMeta.Game?.allowedChildren).toContain('GameOverlay');
    expect(catalog.componentMeta.Game?.bindings?.props?.definition?.value.type).toBe('object');
    expect(catalog.componentMeta.Game?.bindings?.props?.input?.value.type).toBe('record');
    expect(catalog.componentMeta.Game?.events?.output?.eventType).toBe('game.output');
  });

  test('keeps the generic presentation vocabulary free of product-specific concepts', () => {
    const serialized = JSON.stringify(ZORA_PLUGIN_METADATA).toLowerCase();

    expect(serialized).not.toContain('palabichos');
    expect(serialized).not.toContain('vocabulary');
    expect(serialized).not.toContain('wordcreature');
    expect(serialized).not.toContain('letterprojectile');
  });
});
