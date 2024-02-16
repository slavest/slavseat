module.exports = {
  root: true,
  extends: ['slavseat'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/no-absolute-path': ['off'],
    '@next/next/no-img-element': 'off'
  },
};
