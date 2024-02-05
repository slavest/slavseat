module.exports = {
  extends: [
    'standard',
    'next/core-web-vitals',
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
    '@typescript-eslint/no-unused-vars': 'warn',
    '@stylistic/jsx-quotes': ['error', 'prefer-double'],
  },
};
