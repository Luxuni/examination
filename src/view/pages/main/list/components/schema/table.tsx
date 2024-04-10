import { Button, message, Space } from 'antd';
import { ProColumnsType } from 'table-render';

export const columns: ProColumnsType = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    valueType: 'text',
    width: 100,
    ellipsis: true,
    copyable: true,
  },
  {
    title: '模块名',
    dataIndex: 'moudleName',
    ellipsis: true,
    copyable: true,
    valueType: 'text',
    width: 100,
  },
  {
    title: '文件名',
    dataIndex: 'fileName',
    ellipsis: true,
    copyable: true,
    valueType: 'text',
    width: 100,
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: 90,
    valueType: 'text',
  },
  {
    title: '问题类型',
    dataIndex: 'type',
    width: 100,
    valueType: 'text',
  },
  {
    title: '评审日期',
    dataIndex: 'date',
    width: 100,
    valueType: 'text',
  },
  {
    title: '评审意见',
    dataIndex: 'opinion',
    width: 120,
    ellipsis: true,
    copyable: true,
    valueType: 'text',
  },
  {
    title: '操作',
    width: 120,
    render: (_, row) => (
      <Space>
        <Button
          onClick={() => {
            console.log(_, '-----');
            console.log(row, 'row');
            message.success('查看详情');
          }}
        >
          详情
        </Button>
        <Button
          onClick={() => {
            message.success('修复成功');
          }}
        >
          修复
        </Button>
        <Button
          onClick={() => {
            message.success('删除成功');
          }}
        >
          删除
        </Button>
        <Button
          onClick={() => {
            message.success('定位成功');
          }}
        >
          定位
        </Button>
      </Space>
    ),
  },
];

export const setColumns = (tableRef: any) => {
  return [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      valueType: 'text',
      width: 100,
      ellipsis: true,
      copyable: true,
    },
    {
      title: '模块名',
      dataIndex: 'moudleName',
      ellipsis: true,
      copyable: true,
      valueType: 'text',
      width: 100,
    },
    {
      title: '文件名',
      dataIndex: 'fileName',
      ellipsis: true,
      copyable: true,
      valueType: 'text',
      width: 100,
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: 90,
      valueType: 'text',
    },
    {
      title: '问题类型',
      dataIndex: 'type',
      width: 100,
      valueType: 'text',
    },
    {
      title: '评审日期',
      dataIndex: 'date',
      width: 100,
      valueType: 'text',
    },
    {
      title: '评审意见',
      dataIndex: 'opinion',
      width: 120,
      ellipsis: true,
      copyable: true,
      valueType: 'text',
    },
    {
      title: '操作',
      width: 120,
      render: (row) => Buttons(tableRef, row),
    },
  ] as ProColumnsType;
};

const Buttons = (tableRef: any, row: any) => {
  const tab = tableRef?.current?.getState()?.tab;
  console.log(tab, 'tab--');
  return (
    <Space>
      <Button
        onClick={() => {
          message.success('查看详情');
        }}
      >
        详情
      </Button>
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
          (window as any).__vscode__.postMessage({
            command: 'position',
            text: row.range,
          });
          message.success('定位成功');
        }}
      >
        定位
      </Button>
      {tab >= 2 && (
        <Button
          onClick={() => {
            message.success('删除成功');
          }}
        >
          删除
        </Button>
      )}
    </Space>
  );
};
