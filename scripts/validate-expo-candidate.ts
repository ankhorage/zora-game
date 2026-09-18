import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, relative, resolve, sep } from 'node:path';

type JsonObject = Record<string, unknown>;

const REPOSITORY_ROOT = resolve(import.meta.dir, '..');
const FIXTURE_SOURCE = join(REPOSITORY_ROOT, 'examples', 'expo-acceptance');
const IGNORED_COPY_SEGMENTS = new Set(['.expo', 'android', 'dist', 'ios', 'node_modules']);

/*** Narrow one parsed JSON value to a mutable object record. */
function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/*** Read one JSON object from disk or fail with its owning path. */
function readJsonObject(path: string): JsonObject {
  const value: unknown = JSON.parse(readFileSync(path, 'utf8'));
  if (!isJsonObject(value)) throw new Error(`Expected a JSON object in ${path}.`);
  return value;
}

/*** Require one nested JSON value to be an object. */
function requireObject(value: unknown, label: string): JsonObject {
  if (!isJsonObject(value)) throw new Error(`Expected ${label} to be an object.`);
  return value;
}

/*** Require one JSON value to be a string. */
function requireString(value: unknown, label: string): string {
  if (typeof value !== 'string') throw new Error(`Expected ${label} to be a string.`);
  return value;
}

/*** Fail the candidate acceptance with one focused invariant message. */
function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

/*** Run one synchronous acceptance command with stable CI/Expo environment flags. */
function run(
  command: readonly string[],
  cwd: string,
  environment: Readonly<Record<string, string>> = {},
): void {
  console.log(`\n> (${cwd}) ${command.join(' ')}`);
  const result = Bun.spawnSync({
    cmd: [...command],
    cwd,
    env: { ...process.env, CI: '1', EXPO_NO_TELEMETRY: '1', ...environment },
    stderr: 'inherit',
    stdout: 'inherit',
  });
  if (result.exitCode !== 0) {
    throw new Error(`Command failed with exit code ${result.exitCode}: ${command.join(' ')}`);
  }
}

/*** Copy one clean example project without generated native/build/install directories. */
function copyCleanFixture(destination: string): void {
  cpSync(FIXTURE_SOURCE, destination, {
    recursive: true,
    filter: (sourcePath) => {
      const relativePath = relative(FIXTURE_SOURCE, sourcePath);
      return !relativePath.split(sep).some((segment) => IGNORED_COPY_SEGMENTS.has(segment));
    },
  });
}

/*** Point the disposable fixture at the packed zora-game candidate only. */
function configureCandidateFixture(fixtureRoot: string, candidatePath: string): void {
  const packagePath = join(fixtureRoot, 'package.json');
  const packageJson = readJsonObject(packagePath);
  const dependencies = requireObject(packageJson.dependencies, 'fixture dependencies');
  dependencies['@ankhorage/zora-game'] = `file:${candidatePath}`;
  writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
  rmSync(join(fixtureRoot, 'bun.lock'), { force: true });
}

/*** Pack the current repository and return its one candidate tarball path. */
function packCandidate(temporaryRoot: string): string {
  const packageRoot = join(temporaryRoot, 'package');
  mkdirSync(packageRoot);
  run(['bun', 'run', 'build'], REPOSITORY_ROOT);
  run(['npm', 'pack', '--silent', '--pack-destination', packageRoot], REPOSITORY_ROOT, {
    npm_config_cache: join(temporaryRoot, 'npm-cache'),
  });
  const tarballs = readdirSync(packageRoot).filter((name) => name.endsWith('.tgz'));
  assert(tarballs.length === 1, 'Expected npm pack to produce exactly one candidate tarball.');
  const candidate = tarballs[0];
  assert(candidate !== undefined, 'Expected one packed candidate tarball.');
  return join(packageRoot, candidate);
}

/*** Verify that the disposable consumer resolved the exact packed candidate package. */
function verifyCandidateGraph(
  fixtureRoot: string,
  candidatePath: string,
  candidateVersion: string,
): void {
  const packageJson = readJsonObject(join(fixtureRoot, 'package.json'));
  const dependencies = requireObject(packageJson.dependencies, 'fixture dependencies');
  assert(
    dependencies['@ankhorage/zora-game'] === `file:${candidatePath}`,
    'Fixture no longer points to the packed zora-game candidate.',
  );
  const lockText = readFileSync(join(fixtureRoot, 'bun.lock'), 'utf8');
  assert(lockText.includes(basename(candidatePath)), 'Fixture lockfile misses the candidate tarball.');

  const installedRoot = join(fixtureRoot, 'node_modules', '@ankhorage', 'zora-game');
  const installedPackage = readJsonObject(join(installedRoot, 'package.json'));
  const installedVersion = requireString(installedPackage.version, 'installed candidate version');
  assert(
    installedVersion === candidateVersion,
    `Expected zora-game ${candidateVersion}, received ${installedVersion}.`,
  );
  assert(existsSync(join(installedRoot, 'dist', 'index.js')), 'Packed candidate lacks dist/index.js.');
}

/*** Validate one packed candidate through Expo 57 web and native consumer boundaries. */
function runExpoAcceptance(temporaryRoot: string, candidatePath: string): void {
  const fixtureRoot = join(temporaryRoot, 'fixture');
  const exportRoot = join(temporaryRoot, 'web-export');
  const sourcePackage = readJsonObject(join(REPOSITORY_ROOT, 'package.json'));
  const candidateVersion = requireString(sourcePackage.version, 'candidate package version');

  copyCleanFixture(fixtureRoot);
  configureCandidateFixture(fixtureRoot, candidatePath);
  run(['bun', 'install'], fixtureRoot);
  run(['bun', 'x', 'expo', 'install', '--fix'], fixtureRoot);
  rmSync(join(fixtureRoot, 'node_modules'), { force: true, recursive: true });
  run(['bun', 'install', '--frozen-lockfile'], fixtureRoot);
  verifyCandidateGraph(fixtureRoot, candidatePath, candidateVersion);

  run(['bun', 'run', 'typecheck'], fixtureRoot);
  run(['bun', 'x', 'expo', 'install', '--check'], fixtureRoot);
  run(['bunx', 'expo-doctor@1.20.2'], fixtureRoot);
  run(
    ['bun', 'x', 'expo', 'export', '--platform', 'web', '--output-dir', exportRoot, '--clear'],
    fixtureRoot,
  );
  assert(existsSync(join(exportRoot, 'index.html')), 'Expo Web export did not produce index.html.');

  run(['bun', 'x', 'expo', 'prebuild', '--platform', 'ios', '--no-install', '--clean'], fixtureRoot);
  assert(existsSync(join(fixtureRoot, 'ios')), 'Expo native prebuild did not produce ios/.');
}

/*** Run packed Expo candidate acceptance and always remove its disposable workspace. */
function main(): void {
  const temporaryRoot = mkdtempSync(join(tmpdir(), 'zora-game-expo-candidate-'));
  try {
    const candidatePath = packCandidate(temporaryRoot);
    runExpoAcceptance(temporaryRoot, candidatePath);
  } finally {
    rmSync(temporaryRoot, { force: true, recursive: true });
  }
}

main();
