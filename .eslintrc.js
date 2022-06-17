module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'class-methods-use-this': 'off',
  },
  ignorePatterns: ['.eslintrc.js'],
};
