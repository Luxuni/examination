interface responeType {
  success: boolean;
  data: Array<any>;
}

const requestData = (list?: any) => {
  const data: responeType = {
    success: true,
    data: list?.length
      ? list
      : [
          {
            id: Date.now(),
            projectName: '项目名',
            moduleName: '模块名',
            fileName: '文件名',
            author: '作者',
            type: '问题类型',
            date: '评审日期',
            opinion: '评审意见',
          },
          {
            id: Date.now() + 100,
            projectName: '项目名2',
            moduleName: '模块名2',
            fileName: '文件名2',
            author: '作者2',
            type: '问题类型2',
            date: '评审日期2',
            opinion: '评审意见2',
          },
        ],
  };
  return new Promise((resolve) => {
    resolve(data);
  });
};

export const searchApi3 = (list: any) => {
  return async () => {
    const { success, data } = (await requestData(list)) as responeType;
    if (success) {
      return {
        data: data,
        total: data.length,
      };
    } else {
      // 必须返回 data 和 total
      return {
        data: [],
        total: 0,
      };
    }
  };
};
