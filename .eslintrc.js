module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
  extends: ['@react-native-community'],
  rules: {
    semi: 'off',
    curly: 'off',
    'no-console': 'off',
    // 'jsx-quotes': 'off',
    // 'no-undef': 'off',
    // 'no-control-regex': 'off',
    // 'no-catch-shadow': 'off',
    // 'no-extra-boolean-cast': 'off',
    // 'no-bitwise': 'off',
    // 'no-shadow': 'off',
    'react/self-closing-comp': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-inline-styles': 'off',
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'unused-imports/no-unused-imports-ts': 'warn',
    'simple-import-sort/imports': 'error',
    // have to disable since eslint reports errors on enums
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
