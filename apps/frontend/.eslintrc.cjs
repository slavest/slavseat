module.exports = {
  root: true,
  extends: ['slavseat', 'next/core-web-vitals', 'eslint:recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@stylistic/jsx', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/no-absolute-path': ['off'],
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@stylistic/jsx/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: ['key', 'ref'],
      },
    ],
  },
};
