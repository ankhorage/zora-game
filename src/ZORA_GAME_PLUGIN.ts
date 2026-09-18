import { Game } from './features/game-presentation/adapters/inbound/Game';
import { GameEntity } from './features/game-presentation/adapters/inbound/GameEntity';
import { GameField } from './features/game-presentation/adapters/inbound/GameField';
import { GameInputZone } from './features/game-presentation/adapters/inbound/GameInputZone';
import { GameMeasurementProbe } from './features/game-presentation/adapters/inbound/GameMeasurementProbe';
import { GameOverlay } from './features/game-presentation/adapters/inbound/GameOverlay';
import { ZORA_PLUGIN_METADATA } from './ZORA_PLUGIN_METADATA';

/*** Expose the runtime component registry together with metadata for ZORA plugin consumers. */
export const ZORA_GAME_PLUGIN = {
  ...ZORA_PLUGIN_METADATA,
  componentRegistry: {
    Game,
    GameEntity,
    GameField,
    GameInputZone,
    GameMeasurementProbe,
    GameOverlay,
  },
} as const;
