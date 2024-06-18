/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  extends: 'semantic-release-monorepo',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: 'docs', release: 'patch' },
          { type: 'patch', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'minor', release: 'minor' },
          { type: 'major', release: 'major' },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    [
      'semantic-release-replace-plugin',
      {
        replacements: [
          {
            files: ['package.json'],
            from: '"version": ".*"',
            to: '"version": "${nextRelease.version}"',
            results: [
              {
                file: 'package.json',
                hasChanged: true,
                numMatches: 1,
                numReplacements: 1,
              },
            ],
            countMatches: true,
          },
        ],
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'src/CHANGELOG.md', 'package.json'],
        message:
          'chore(release): ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
};
