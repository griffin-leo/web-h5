/**
 * 根项目的Vue3 ESLint配置
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],
  rules: {
    // prettier
    'prettier/prettier': 'error'
  },
  parserOptions: {
    // 指定要使用的 ECMAScript 语法版本
    ecmaVersion: 2020
  }
};
