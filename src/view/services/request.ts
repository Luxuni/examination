import { message } from 'antd';
import { extend } from 'umi-request';

const request = extend({
  timeout: 5000,
});

request.interceptors.request.use((url, options) => {
  return {
    url,
    options: { ...options, interceptors: true },
  };
});

request.interceptors.response.use((response) => {
  const codeMaps = {
    400: '请求错误。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };
  if (response.status < 200 || response.status >= 300) {
    message.error(codeMaps[response.status as keyof typeof codeMaps]);
  }
  return response;
});

export default request;
