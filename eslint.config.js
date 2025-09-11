import js from '@eslint/js';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          sourceType: 'module'
        }
      },
      globals: {
        // Node.js globals
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'readonly',
        module: 'readonly',
        require: 'readonly',

        // ES globals
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        process: 'readonly'
      }
    },
    rules: {
      // 基础规则配置
      'no-debugger': ['error'],
      'prefer-const': ['error'],
      'no-var': ['error'],
      'no-empty': ['warn'],
      'no-unreachable': ['error'],

      // 代码质量规则
      'eqeqeq': ['error', 'always'],
      'no-eval': ['error'],
      'no-implied-eval': ['error'],
      'no-extend-native': ['error'],
      'no-implicit-coercion': ['error'],
      'no-invalid-this': ['error'],
      'no-throw-literal': ['error'],

      // 变量和作用域规则
      'no-shadow': ['error'],
      'no-unused-vars': ['error', { 'args': 'none' }],
      'no-undef': ['error'],
      'no-global-assign': ['error'],

      // 风格指南规则
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'never'],
      'comma-spacing': ['error'],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': ['error'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'brace-style': ['error', '1tbs'],
      'space-before-blocks': ['error'],
      'space-before-function-paren': ['error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always'
      }],

      // ES6+ 特性规则
      'arrow-spacing': ['error'],
      'no-duplicate-imports': ['error'],
      'prefer-arrow-callback': ['error'],
      'prefer-template': ['error'],
      'template-curly-spacing': ['error', 'never']
    }
  }
]);
