/***
 * Embed a config-driven Game inside ordinary ZORA content.
 *
 * Game owns the local platform-neutral session, GameEntity renders positioned presentation, and
 * GameOverlay composes HUD/feedback content. Set `fill` when the surrounding layout should give
 * the game all available space; no dedicated GameScreen runtime type is required.
 *
 * @usage
 * @readme
 */
import {
  AppBar,
  AppShell,
  Screen,
  ScreenSection,
  Text,
  ZoraProvider,
  type ZoraTheme,
} from '@ankhorage/zora';
import { Game, GameEntity, GameOverlay } from '@ankhorage/zora-game';

const gameTheme: ZoraTheme = {
  id: 'basic-game-presentation',
  name: 'Basic game presentation',
  appCategory: 'games',
  primaryColor: '#2563eb',
  harmony: 'analogous',
};

const definition = {
  id: 'orb-field',
  initialPhase: 'playing',
  initialState: { score: 0 },
  stages: [{ id: 'round' }],
  rules: [],
} as const;

export default function BasicGamePresentationApp() {
  return (
    <ZoraProvider initialMode="light" theme={gameTheme}>
      <AppShell header={<AppBar title="Orb field" subtitle="Generic embeddable game UI" />}>
        <Screen>
          <ScreenSection
            title="Mini-game region"
            description="The game lives beside ordinary screen content."
          >
            <Text emphasis="muted">
              Game rules stay in @ankhorage/game; this package owns presentation and input adapters.
            </Text>
            <Game definition={definition} aspectRatio={1.4} minHeight={320}>
              <GameEntity x={18} y={28} accessibilityLabel="Blue orb">
                <Text>●</Text>
              </GameEntity>
              <GameEntity x={68} y={52} scale={1.4} accessibilityLabel="Large orb">
                <Text>◆</Text>
              </GameEntity>
              <GameEntity x={46} y={78} accessibilityLabel="Player marker">
                <Text>▲</Text>
              </GameEntity>
              <GameOverlay placement="top" padding={12}>
                <Text>Score 0 / 5</Text>
              </GameOverlay>
            </Game>
          </ScreenSection>
        </Screen>
      </AppShell>
    </ZoraProvider>
  );
}
