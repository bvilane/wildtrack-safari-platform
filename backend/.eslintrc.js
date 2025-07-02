module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-console': 'off',
    'no-unused-vars': 'warn'
  }
};