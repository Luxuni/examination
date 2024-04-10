import { Schema } from 'form-render';
const mainFormCreate = (
  authorOptions: {
    name: string;
    userId: number;
  }[],
): Schema => {
  return {
    type: 'object',
    properties: {
      opinion: {
        title: '评审意见',
        type: 'string',
        props: {
          placeholder: '请输入评审意见',
          allowClear: true,
        },
        tooltip: {
          title: '请输入评审意见',
        },
        required: true,
        message: {
          required: '请输入评审意见',
        },
        widget: 'input',
      },
      type: {
        title: '问题类型',
        type: 'string',
        props: {
          options: [
            {
              label: 'A',
              value: 'A',
            },
            {
              label: 'B',
              value: 'B',
            },
          ],
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
      author: {
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
    },
    displayType: 'column',
    column: 1,
    maxWidth: '100%',
  };
};
export default mainFormCreate;
