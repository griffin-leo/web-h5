const autoprefixer = require('autoprefixer');
const postcsspxtovw = require('@xianzhengquan/postcss-px-2-vw');

module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        'Chrome >= 51',
        'Android >= 51',
        'Safari >= 10',
        'iOS >= 10'
      ]
    }),
    postcsspxtovw({
      // 非vant
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 375, // UI设计稿的宽度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules\/vant/],
      landscape: false // 是否处理横屏情况
    })
  ]
};