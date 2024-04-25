import { Button, message, Space } from 'antd';
import { ProColumnsType, TableContext } from 'table-render';
import { rangeState } from '../../../../../features/rangeSlice';

const Buttons = (
  tableRef: React.MutableRefObject<TableContext | null>,
  row: rangeState['range'],
) => {
  // const tab = tableRef.current?.getState()?.tab;

  return (
    <Space>
      <Button
        onClick={() => {
          message.success('修复成功');
        }}
      >
        修复
      </Button>
      <Button
        onClick={() => {
          console.log(row, 'row');
          const { filePath, startLine, endLine } = row as any;
          (window as any).__vscode__.postMessage({
            command: 'position',
            text: `${filePath};,${startLine}-0;,${endLine}-0`,
          });
          message.success('定位成功');
        }}
      >
        定位
      </Button>
    </Space>
  );
};

export const createColumns = (
  tableRef: React.MutableRefObject<TableContext | null>,
): ProColumnsType => {
  return [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      valueType: 'text',
      ellipsis: true,
      copyable: true,
      width: '120px',
    },
    {
      title: '模块名',
      dataIndex: 'moduleName',
      ellipsis: true,
      copyable: true,
      valueType: 'text',
      width: '120px',
    },
    {
      title: '文件名',
      dataIndex: 'fileName',
      ellipsis: true,
      copyable: true,
      valueType: 'text',
      width: '120px',
    },
    {
      title: '作者',
      dataIndex: 'author',
      valueType: 'text',
      width: '120px',
    },
    {
      title: '问题类型',
      dataIndex: 'errorDistName',
      valueType: 'text',
      width: '120px',
    },
    {
      title: '评审日期',
      dataIndex: 'createDate',
      valueType: 'text',
      width: '120px',
    },
    {
      title: '评审意见',
      dataIndex: 'comment',
      ellipsis: true,
      copyable: true,
      valueType: 'text',
      width: '120px',
    },
    {
      title: '操作',
      width: '240px',
      render: (row: rangeState['range']) => Buttons(tableRef, row),
    },
  ];
};
