import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended, eslintPluginPrettierRecommended,
  {
    ignores: ['node_modules', 'dist'],
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expression': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
    globals: 'readonly',
  },
];
