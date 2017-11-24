module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  parser: 'babel-eslint',
  env: {
    browser: true,
    'jest/globals': true,
  },
  plugins: [
    'jest',
  ],
  extends: [
    'plugin:jest/recommended',
    'airbnb-base',
  ],
};