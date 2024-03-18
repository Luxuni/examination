import request from './request';

const host = 'https://ideaplugin.lonsun.cn/codereview/codeReview';

const url = {
  getUserList: `${host}/getUserList`,
};

const getUserList = () => {
  return request.get<
    {
      name: string;
      userId: number;
    }[]
  >(url.getUserList);
};

export { getUserList };
