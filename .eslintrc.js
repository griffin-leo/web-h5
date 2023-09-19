/**
 * 根项目的Vue3 ESLint配置
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['markdown'],
  extends: [
    'eslint:recommended',
    'plugin:jsonc/recommended-with-jsonc',
    'plugin:markdown/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  // ignorePatterns: '**/*.md', // 忽略所有 Markdown 文件
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // prettier
    'prettier/prettier': 'error'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    // 指定要使用的 ECMAScript 语法版本
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
};
