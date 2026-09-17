import { gameEntityMeta } from './features/game-presentation/meta/gameEntityMeta';
import { gameFieldMeta } from './features/game-presentation/meta/gameFieldMeta';
import { gameInputZoneMeta } from './features/game-presentation/meta/gameInputZoneMeta';
import { gameMeta } from './features/game-presentation/meta/gameMeta';
import { gameOverlayMeta } from './features/game-presentation/meta/gameOverlayMeta';

/*** Register the generic game presentation metadata owned by this package. */
export const ZORA_GAME_COMPONENT_META = {
  Game: gameMeta,
  GameEntity: gameEntityMeta,
  GameField: gameFieldMeta,
  GameInputZone: gameInputZoneMeta,
  GameOverlay: gameOverlayMeta,
} as const;
