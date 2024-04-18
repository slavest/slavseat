module.exports = {
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@stylistic'],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'withTwin.js',
    '.eslintrc.js',
  ],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    // jsx 린트인데 왜 @stylistic/jsx에 없고 @stylistic에 있는지 모르겠음
    '@stylistic/jsx-quotes': ['error', 'prefer-double'],
  },
};
