import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  entry: [
    'src/index.ts',
    'src/metadata.ts',
    'examples/**/*.ts',
    'examples/**/*.tsx',
    'paradox.config.ts',
    'eslint.config.mjs',
    'eslint.local.config.mjs',
    '.prettierrc.js',
    'prettier.local.config.js',
  ],
  ignore: ['dist/**'],
});
