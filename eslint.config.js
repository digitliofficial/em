import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import exportDefaultIdentifier from 'eslint-plugin-export-default-identifier'
import importPlugin from 'eslint-plugin-import'
import jsdoc from 'eslint-plugin-jsdoc'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: ['node_modules/**', 'dist/**', '**/*.spec.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
    },
    plugins: {
      'export-default-identifier': exportDefaultIdentifier,
      jsdoc,
      react,
      'react-refresh': reactRefresh,
      prettier,
      '@typescript-eslint': typescriptEslint,
      'import': importPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/exhaustive-deps': 'error',
      'no-restricted-properties': [
        'off',
        {
          object: 'window',
          property: 'getSelection',
          message:
            'Please import the appropriate helper function from /src/device/selection.ts to access the browser selection.',
        },
      ],
      'export-default-identifier/export-default-identifier': 'off',
      'jsdoc/require-jsdoc': [
        'error',
        {
          contexts: ['VariableDeclarator > ArrowFunctionExpression'],
          require: {
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
          },
        },
      ],
      'import/prefer-default-export': 'off',
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-indentation': 'error',
      'jsdoc/check-syntax': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/implements-on-classes': 'error',
      'jsdoc/no-types': 'error',
      'jsdoc/check-tag-names': [
        'error',
        {
          definedTags: ['packageDocumentation', 'jest-environment'], // Added 'jest-environment'
        },
      ],
      'jsdoc/require-description-complete-sentence': [
        'error',
        {
          abbreviations: ['e.g.', 'i.e.'],
        },
      ],
      'jsx-a11y/anchor-is-valid': 'off',
      'react/jsx-curly-spacing': 'error',
      'react/jsx-equals-spacing': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'allow' }],
      'react/no-children-prop': 'off',
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'off',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          quoteProps: 'consistent', // Ensures consistent quotes for object keys
        },
      ],
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json', './server/tsconfig.json', './tsconfig.eslint.json'], // Add multiple tsconfigs if necessary
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      'semi': ['error', 'never'],
      'no-extra-parens': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'none',
          },
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/array-type': 'error',
      'jsx-quotes': ['error', 'prefer-single'],
      'react-refresh/only-export-components': 'error',
    },
  },
]
