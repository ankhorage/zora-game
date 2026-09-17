import { ZORA_GAME_COMPONENT_META } from './ZORA_GAME_COMPONENT_META';
/*** Describe generic game presentation nodes and their valid ZORA extension hosts. */
export const ZORA_PLUGIN_METADATA = {
    packageName: '@ankhorage/zora-game',
    displayName: 'ZORA Game',
    componentMeta: ZORA_GAME_COMPONENT_META,
    extensionHosts: ['GameField', 'GameEntity', 'GameOverlay'],
    placements: [
        {
            child: 'GameField',
            parents: ['Card', 'Grid', 'Screen', 'ScreenSection', 'View'],
        },
        {
            child: 'GameEntity',
            parents: ['GameField', 'GameOverlay'],
        },
        {
            child: 'GameOverlay',
            parents: ['GameField'],
        },
    ],
};
//# sourceMappingURL=ZORA_PLUGIN_METADATA.js.map