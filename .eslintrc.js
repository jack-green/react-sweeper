module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
      browser: true,
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
};