import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig({
  files: ['**/*.{js,cjs,mjs,ts,cts,mts}'],

  ignores: ['dist/**', 'coverage/**'],

  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
  ],
});
