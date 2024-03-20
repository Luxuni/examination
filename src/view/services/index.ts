import request from './request';

const host = 'https://ideaplugin.lonsun.cn/codereview/codeReview';

const url = {
  getUserList: `${host}/getUserList`,
  getCodeList: `${host}/getCodeList`,
};

const getUserList = () => {
  return request.get<
    {
      name: string;
      userId: number;
    }[]
  >(url.getUserList);
};

const getCodeList = (params: any) => {
  return request.get<
    {
      code: string;
      codeId: number;
    }[]
  >(url.getCodeList, { params });
};

export { getCodeList, getUserList };
