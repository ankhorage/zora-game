import { defineParadoxConfig } from '@ankhorage/paradox';

export default defineParadoxConfig({
  mode: 'write',
  docs: {
    title: '@ankhorage/zora-game',
    description:
      'Generic game presentation primitives for React Native and React Native Web apps built on ZORA.',
  },
  package: {
    root: '.',
    entrypoints: ['src/index.ts', 'src/metadata.ts'],
  },
  output: { dir: './paradox' },
});
