import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['**/dist', '**/node_modules', 'server/prisma/migrations']),

  // TypeScript parser for all TS/TSX files
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommended],
  },

  // Client: React rules, browser globals
  {
    files: ['client/src/**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },

  // Client config files (vite.config.ts etc.) run in Node, not browser
  {
    files: ['client/*.config.{ts,js}'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Server and shared: Node globals
  {
    files: ['server/**/*.ts', 'shared/**/*.ts'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },

  prettierConfig,
])
