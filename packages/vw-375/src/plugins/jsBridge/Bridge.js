import { OS } from '@/type/provide';
import { isAndroid, isIOS } from '@/utils/common';

const JsBridgePlugin = {
  install: (app, options) => {
    const isAndroidModel = isAndroid(),
      isIosModel = isIOS();

    app.provide(OS, {
      isAndroid: isAndroidModel,
      isIos: isIosModel
    });

    if (isAndroidModel || isIosModel) {
      // 注入一个全局可用的 $translate() 方法
      app.config.globalProperties.$jsBridge = {
        callHandler: function () {},
        registerHandler: function () {}
      };
    }
    if (isAndroidModel) {
      //Android
      androidBridge(function (bridge) {
        bridge.init(function (message, responseCallback) {
          console.log('JS got a message', message);
          const data = {
            'Javascript Responds': 'Wee!'
          };
          responseCallback(data);
        });
        app.config.globalProperties.$jsBridge = bridge;
        options.ready();
      });
    }
    if (isIosModel) {
      //iOS
      iosBridge(function (bridge) {
        const { callHandler, registerHandler } = bridge;
        app.config.globalProperties.$jsBridge = bridge;
        Object.assign(app.config.globalProperties.$jsBridge, {
          callHandler() {
            callHandler(...arguments);
          },
          registerHandler() {
            registerHandler(...arguments);
          }
        });
        options.ready();
      });
    }
  }
};

// Android调用原生的方法封装：
// (前端js与原生Native通信方法外层包裹的固定代码)
function androidBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  let timerRemoveIframe = setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe);
    clearTimeout(timerRemoveIframe);
    timerRemoveIframe = null;
  }, 0);
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        callback(window.WebViewJavascriptBridge);
      },
      false
    );
  }
}
// iOS调用原生的方法封装：
function iosBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  let timerRemoveIframe = setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe);
    clearTimeout(timerRemoveIframe);
    timerRemoveIframe = null;
  }, 0);
}

export default JsBridgePlugin;
