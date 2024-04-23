import request from './request';

const host = 'https://ideaplugin.lonsun.cn/codereview/codeReview';

const url = {
  getUserList: `${host}/getUserList`,
  getCodeList: `${host}/getCodeList`,
  getTypeList: `${host}/getTypeList`,
};

/**
 * 获取用户列表
 */
const getUserList = () => {
  return request.get<
    {
      name: string;
      userId: number;
    }[]
  >(url.getUserList);
};

/*
 * 查询问题列表
 */
const getCodeList = (params: any) => {
  return request.get<
    {
      code: string;
      codeId: number;
    }[]
  >(url.getCodeList, { params });
};

/*
 * 获取所有错误类别
 */
const getTypeList = () => {
  return request.get<
    {
      dictCode: string;
      dictName: string;
    }[]
  >(url.getTypeList);
};

export { getCodeList, getTypeList, getUserList };
