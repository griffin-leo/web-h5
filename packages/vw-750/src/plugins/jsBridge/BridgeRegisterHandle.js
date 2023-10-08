import {
  applyTokenForG5,
  checkLoginForG5,
  requestLoginForG5,
  getUserInfoForG5,
  getClientInfoForG5,
  getDeviceInfoForG5,
  getNetworkInfoForG5,
  checkForegroundForG5
} from './BridgeCmd.js';

// 申请访问token
export const jsBridgeApplyTokenForG5 = ({
  jsBridge,
  params = {},
  complete = () => {}
} = {}) => {
  const { callHandler } = jsBridge;
  callHandler(applyTokenForG5, JSON.stringify(params), res => complete(res));
};

// 检查用户是否登录
export const jsBridgeCheckLoginForG5 = ({
  jsBridge,
  params = {},
  complete = () => {}
} = {}) => {
  const { callHandler } = jsBridge;
  callHandler(checkLoginForG5, JSON.stringify(params), res => complete(res));
};

// 请求登录
export const jsBridgeRequestLoginForG5 = ({
  jsBridge,
  params = {},
  complete = () => {}
} = {}) => {
  const { callHandler } = jsBridge;
  callHandler(requestLoginForG5, JSON.stringify(params), res => complete(res));
};

// 获取用户信息
export const jsBridgeGetUserInfoForG5 = ({
  jsBridge,
  params = {},
  complete = () => {}
} = {}) => {
  const { callHandler } = jsBridge;
  callHandler(getUserInfoForG5, JSON.stringify(params), res => complete(res));
};

// 获取客户端信息
export const jsBridgeGetClientInfoForG5 = ({
  jsBridge,
  params = {},
  complete = () => {}
} = {}) => {
  const { callHandler } = jsBridge;
  callHandler(getClientInfoForG5, JSON.stringify(params), res => complete(res));
};

// 获取设备信息
export const jsBridgeGetDeviceInfoForG5 = ({
  jsBridge,
  params = {},
  complete = () => {}
} = {}) => {
  const { callHandler } = jsBridge;
  callHandler(getDeviceInfoForG5, JSON.stringify(params), res => complete(res));
};

// 获取网络连接信息
export const jsBridgeGetNetworkInfoForG5 = ({
  jsBridge,
  params = {},
  complete = () => {}
} = {}) => {
  const { callHandler } = jsBridge;
  callHandler(getNetworkInfoForG5, JSON.stringify(params), res =>
    complete(res)
  );
};

// 检查h5页面是否在前台
export const jsBridgeCheckForegroundForG5 = ({
  jsBridge,
  params = {},
  complete = () => {}
} = {}) => {
  const { callHandler } = jsBridge;
  callHandler(checkForegroundForG5, JSON.stringify(params), res =>
    complete(res)
  );
};
