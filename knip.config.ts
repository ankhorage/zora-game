import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  workspaces: {
    '.': {
      entry: [
        'src/index.ts',
        'src/metadata.ts',
        'examples/basic-game-presentation/**/*.tsx',
        'paradox.config.ts',
        'eslint.config.mjs',
        'eslint.local.config.mjs',
        '.prettierrc.js',
        'prettier.local.config.js',
      ],
      ignore: ['dist/**'],
    },
    'examples/expo-acceptance': {
      entry: ['index.ts', 'App.tsx'],
      project: ['*.ts', '*.tsx'],
    },
  },
});
