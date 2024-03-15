import request from './request';

const host = 'https://ideaplugin.lonsun.cn/codereview/codeReview';

const url = {
  getUserList: `${host}/getUserList`,
};

const getUserList = () => {
  return request.get(url.getUserList);
};

export { getUserList };
