import { Schema } from 'form-render';
const mainFormCreate = (
  authorOptions: {
    name: string;
    userId: number;
  }[],
  typeOptions: {
    dictCode: string;
    dictName: string;
  }[],
): Schema => {
  return {
    type: 'object',
    column: 2,
    properties: {
      errorDistCode: {
        title: '问题类型',
        type: 'string',
        props: {
          options: typeOptions.map((item) => ({
            label: item.dictName,
            value: item.dictCode,
          })),
          placeholder: '请选择问题类型',
        },
        tooltip: {
          title: '请选择问题类型',
        },
        required: true,
        message: {
          required: '请选择问题类型',
        },
        widget: 'select',
      },
      authorUserId: {
        title: '作者',
        type: 'number',
        props: {
          options: authorOptions.map((item) => ({
            label: item.name,
            value: item.userId,
          })),
          placeholder: '请选择作者',
        },
        description: '',
        tooltip: {
          title: '请选择作者',
        },
        required: true,
        message: {
          required: '请选择作者',
        },
        widget: 'select',
      },
      comment: {
        title: '评审意见',
        type: 'string',
        props: {
          placeholder: '请输入评审意见',
          allowClear: true,
          rows: 4,
          minLength: 1,
          maxLength: 200,
        },
        tooltip: {
          title: '请输入评审意见',
        },
        required: true,
        message: {
          required: '请输入评审意见',
        },
        widget: 'textArea',
        cellSpan: 2,
      },
    },
    displayType: 'column',
    maxWidth: '100%',
  };
};
export default mainFormCreate;
