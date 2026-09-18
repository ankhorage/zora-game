import { defineParadoxConfig } from '@ankhorage/paradox';

export default defineParadoxConfig({
  mode: 'write',
  docs: {
    title: '@ankhorage/zora-game',
    description:
      'Generic game presentation primitives for React Native and React Native Web apps built on ZORA.',
    usage: {
      description:
        'Use @ankhorage/game for serializable gameplay semantics and @ankhorage/zora-game for the React Native / React Native Web presentation edge. Embed Game in ordinary ZORA layout, render session state with GameEntity and overlays, and add input/measurement adapters only where the platform needs them.',
      entrypoints: ['examples/basic-game-presentation/App.tsx'],
    },
  },
  package: {
    root: '.',
    entrypoints: ['src/index.ts', 'src/metadata.ts'],
  },
  output: { dir: './paradox' },
});
