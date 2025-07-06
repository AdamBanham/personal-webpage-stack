module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off' // Disable for mixed JS/TS compatibility
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue']
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@typescript-eslint/recommended'
      ],
      parser: '@typescript-eslint/parser',
      plugins: [
        'vue',
        '@typescript-eslint'
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/multi-word-component-names': 'off'
      }
    },
    {
      files: ['*.js', '*.jsx'],
      // JavaScript files don't need TypeScript rules
      parser: 'espree',
      rules: {
        'no-unused-vars': 'warn'
      }
    }
  ]
}