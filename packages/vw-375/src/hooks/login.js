import {
  jsBridgeApplyTokenForG5,
  jsBridgeRequestLoginForG5,
  jsBridgeGetDeviceInfoForG5,
  jsBridgeGetUserInfoForG5
} from '@/plugins/jsBridge/BridgeRegisterHandle';
import { showToast } from 'vant';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const { setUserInfo } = userStore;

export function useLogin() {
  // 申请访问token
  const applyToken = (jsBridge, callBack) => {
    // call native method
    jsBridgeApplyTokenForG5({
      jsBridge: jsBridge,
      params: { appId: '1000000001' },
      complete: res => {
        const rspJson = JSON.parse(res);
        console.log('jsBridgeApplyTokenForG5：', rspJson);
        if (rspJson.code == 0) {
          let token = rspJson['data'].token;
          // // 请求登录
          // requestLoginForG5(jsBridge, token, callBack);
          // 获取设备信息
          getDeviceInfoForG5(jsBridge, token, callBack);
        } else {
          showToast({
            message: rspJson?.data?.msg ? rspJson.data.msg : '数据错误'
          });
        }
      }
    });
  };
  const applyTokenForG5 = (jsBridge, callBack) => {
    // call native method
    jsBridgeApplyTokenForG5({
      jsBridge: jsBridge,
      params: { appId: '1000000001' },
      complete: res => {
        const rspJson = JSON.parse(res);
        console.log('jsBridgeApplyTokenForG5：', rspJson);
        if (rspJson.code == 0) {
          let token = rspJson['data'].token;
          // 获取设备信息
          getDeviceInfoForG5(jsBridge, token, callBack);
        }
      }
    });
  };
  // 请求登录
  const requestLoginForG5 = (jsBridge, h5Token, callBack) => {
    // call native method
    const params = { token: h5Token };
    jsBridgeRequestLoginForG5({
      jsBridge: jsBridge,
      params,
      complete: res => {
        const rspJson = JSON.parse(res);
        console.log('jsBridgeRequestLoginForG5：', rspJson);
        if (rspJson.code == 1002) {
          // 申请访问token
          applyTokenForG5(jsBridge, callBack);
        }
        if (rspJson.code == 1003) {
          // 获取设备信息
          getDeviceInfoForG5(jsBridge, h5Token, callBack);
        }
        if (![1002, 1003].includes(rspJson.code)) {
          showToast({
            message: rspJson?.data?.msg ? rspJson.data.msg : '数据错误'
          });
        }
      }
    });
  };
  // 获取设备信息
  const getDeviceInfoForG5 = (jsBridge, h5Token, callBack) => {
    const params = { token: h5Token };
    // call native method
    jsBridgeGetDeviceInfoForG5({
      jsBridge: jsBridge,
      params,
      complete: res => {
        const rspJson = JSON.parse(res);
        console.log('jsBridgeGetDeviceInfoForG5：', rspJson);
        if (rspJson.code == 0) {
          let udid = rspJson['data'].udid;
          // 保存token，udid
          setUserInfo({
            appToken: h5Token,
            udid
          });
          callBack(h5Token, udid);
          // 获取用户信息
          // getUserInfoForG5(jsBridge, h5Token);
        } else {
          showToast({
            message: rspJson?.data?.msg ? rspJson.data.msg : '数据错误'
          });
        }
      }
    });
  };
  // 获取用户信息
  const getUserInfoForG5 = (jsBridge, h5Token) => {
    const params = { token: h5Token };
    // call native method
    jsBridgeGetUserInfoForG5({
      jsBridge: jsBridge,
      params,
      complete: res => {
        const rspJson = JSON.parse(res);
        console.log('jsBridgeGetUserInfoForG5：', rspJson);
      }
    });
  };
  return { applyToken, requestLoginForG5, getUserInfoForG5 };
}
