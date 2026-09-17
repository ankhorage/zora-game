import {
  AppBar,
  AppShell,
  Screen,
  ScreenSection,
  Text,
  ZoraProvider,
  type ZoraTheme,
} from '@ankhorage/zora';
import { GameEntity, GameField, GameOverlay } from '@ankhorage/zora-game';

const gameTheme: ZoraTheme = {
  id: 'basic-game-presentation',
  name: 'Basic game presentation',
  appCategory: 'games',
  primaryColor: '#2563eb',
  harmony: 'analogous',
};

/***
 * Minimal non-product game presentation example.
 *
 * Compose a field, positioned entities, and overlay content without embedding
 * game rules or requiring a dedicated full-screen game application type.
 *
 * @usage
 * @readme
 */
export default function BasicGamePresentationApp() {
  return (
    <ZoraProvider initialMode="light" theme={gameTheme}>
      <AppShell header={<AppBar title="Orb field" subtitle="Generic embeddable game UI" />}>
        <Screen>
          <ScreenSection
            title="Mini-game region"
            description="The game field lives beside ordinary screen content."
          >
            <Text emphasis="muted">
              This example contains presentation only; game semantics remain outside ZORA.
            </Text>
            <GameField aspectRatio={1.4} minHeight={320}>
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
                <Text>Score 2 / 5</Text>
              </GameOverlay>
            </GameField>
          </ScreenSection>
        </Screen>
      </AppShell>
    </ZoraProvider>
  );
}
