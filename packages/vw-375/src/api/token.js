import http from '@/service/http';

/**
 * 获取token
 * token string token
 * udid string string
 */
export const getUserTokenApi = params => {
  return http.request({
    url: '/tokens',
    method: 'post',
    data: params
  });
};
