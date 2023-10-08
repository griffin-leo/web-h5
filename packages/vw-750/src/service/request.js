import axios from 'axios';
import { showToast, showLoadingToast, closeToast } from 'vant';

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queue = {};
    closeToast();
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: 16000,
      isLoading: true,
      headers: {
        'Content-Type': 'application/json;charse=UTF-8'
      }
    };
    // const userToken = userInfo.value ? userInfo.value.token : '';
    const userToken = localStorage.getItem('user_token')
      ? localStorage.getItem('user_token')
      : '';
    userToken && (config.headers.Authorization = userToken);
    return config;
  }
  destroy(url) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      closeToast();
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          if (config.isLoading) {
            showLoadingToast({
              message: '加载中...',
              forbidClick: true
            });
            setTimeout(() => {
              closeToast();
            }, 12000);
          }
        }
        this.queue[url] = true;
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url);
        if (res.data.code == 403 && res.data.msg == '验签不通过') {
          // resetStore();
          showToast('登录过期，请重新登录');
          return Promise.reject(res);
        } else {
          const { data, status } = res;
          return { data: data, status };
        }
      },
      error => {
        console.log(JSON.stringify(error));
        if (
          error.code === 'ECONNABORTED' &&
          error.message.indexOf('timeout') !== -1
        ) {
          showToast('服务超时');
        } else {
          showToast('网络错误');
          console.log('错误异常信息', error);
        }
        this.destroy(url);
        let errorInfo = error.response;
        if (!errorInfo) {
          const {
            request: { statusText, status },
            config
          } = JSON.parse(JSON.stringify(error));
          errorInfo = {
            statusText,
            status,
            request: { responseURL: config.url }
          };
        }
        return Promise.reject(error);
      }
    );
  }
  request(options) {
    const instance = axios.create();
    let headers = Object.assign(
      this.getInsideConfig().headers,
      options.headers
    );
    options.headers = headers;
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
