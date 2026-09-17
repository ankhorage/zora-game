import type { ZoraPluginMetadata } from '@ankhorage/zora/metadata';

import { ZORA_GAME_COMPONENT_META } from './ZORA_GAME_COMPONENT_META';

/*** Describe generic game presentation nodes and their valid ZORA extension hosts. */
export const ZORA_PLUGIN_METADATA = {
  packageName: '@ankhorage/zora-game',
  displayName: 'ZORA Game',
  componentMeta: ZORA_GAME_COMPONENT_META,
  extensionHosts: ['Game', 'GameField', 'GameEntity', 'GameOverlay'],
  placements: [
    {
      child: 'Game',
      parents: ['Card', 'Grid', 'Screen', 'ScreenSection', 'View'],
    },
    {
      child: 'GameField',
      parents: ['Card', 'Grid', 'Screen', 'ScreenSection', 'View'],
    },
    {
      child: 'GameEntity',
      parents: ['Game', 'GameField', 'GameOverlay'],
    },
    {
      child: 'GameOverlay',
      parents: ['Game', 'GameField'],
    },
  ],
} as const satisfies ZoraPluginMetadata;
