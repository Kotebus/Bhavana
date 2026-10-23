const expoConfig = require('eslint-config-expo/flat');

module.exports = [
  ...expoConfig,
  {
    ignores: ['android/**', '.expo/**', 'node_modules/**', 'dist/**'],
  },
];
