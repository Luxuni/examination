import { rangeState } from '../features/rangeSlice';
import request from './request';

const host = 'https://ideaplugin.lonsun.cn/codereview/codeReview';

const url = {
  getUserList: `${host}/getUserList`,
  getCodeList: `${host}/getCodeList`,
  getTypeList: `${host}/getTypeList`,
  save: `${host}/save`,
  delete: `${host}/delete`,
  fix: `${host}/fix`,
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
const getCodeList = (params: { operator: number; type: 1 | 2 | 3 | 4 }) => {
  return request.get<Exclude<rangeState['range'], null>[]>(url.getCodeList, {
    params,
  });
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

/*
 * 新增问题
 */
const save = (data: Exclude<rangeState['range'], null>) => {
  return request.post(url.save, {
    data,
  });
};

/*
 * 删除问题
 */
const deleteCode = (data: { idList: number[] }) => {
  return request.post(url.delete, {
    data: data.idList,
  });
};

/*
 * 修复问题
 */
const fix = (data: { idList: number[] }) => {
  return request.post(url.fix, {
    data: data.idList,
  });
};

export { deleteCode, fix, getCodeList, getTypeList, getUserList, save };
