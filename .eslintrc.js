/**
 * 根项目的Vue3 ESLint配置
 */
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
    'vue/setup-compiler-macros': true
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
    'prettier/prettier': 'error',
    // vue3-eslint
    // 添加组件命名忽略规则
    'vue/multi-word-component-names': 'off'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    // 指定要使用的 ECMAScript 语法版本
    ecmaVersion: 'latest',
    sourceType: 'module'
  }
};
