// Extend parent ESLint config with landing-specific overrides
import parentConfig from '../eslint.config.js'
import { globalIgnores } from 'eslint/config'

export default [
  ...parentConfig,
  globalIgnores(['dist', 'vite.config.ts']),
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]
