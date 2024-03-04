module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  overrides: [],
  rules: {
    '@typescript-eslint/require-await': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        argsIgnorePattern: '^_',
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'semi-spacing': ['error', { 'before': false, 'after': true }],
    'array-bracket-newline': ['error', { 'multiline': true }],
    'semi': ['error', 'always'],
    'semi-style': ['error', 'last'],
    'eol-last': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'no-trailing-spaces': 'error'
  },
};
