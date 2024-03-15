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
  return response;
});

export default request;
