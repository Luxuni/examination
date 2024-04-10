import { Button, message, Space } from 'antd';
import { ProColumnsType } from 'table-render';

export const columns: ProColumnsType = [
  {
    title: '项目名称',
    dataIndex: 'projectName',
    valueType: 'text',
    width: '120px',
    ellipsis: true,
    copyable: true,
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
    width: '120px',
    valueType: 'text',
  },
  {
    title: '问题类型',
    dataIndex: 'type',
    width: '120px',
    valueType: 'text',
  },
  {
    title: '评审日期',
    dataIndex: 'date',
    width: '120px',
    valueType: 'text',
  },
  {
    title: '评审意见',
    dataIndex: 'opinion',
    width: '120px',
    ellipsis: true,
    copyable: true,
    valueType: 'text',
  },
  {
    title: '操作',
    width: '320px',
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
      dataIndex: 'type',
      valueType: 'text',
      width: '120px',
    },
    {
      title: '评审日期',
      dataIndex: 'date',
      valueType: 'text',
      width: '120px',
    },
    {
      title: '评审意见',
      dataIndex: 'opinion',
      ellipsis: true,
      copyable: true,
      valueType: 'text',
      width: '120px',
    },
    {
      title: '操作',
      width: '320px',
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
          const { filePath, startLine, startCharacter, endLine, endCharacter } =
            row as any;
          (window as any).__vscode__.postMessage({
            command: 'position',
            text: `${filePath};,${startLine}-${startCharacter};,${endLine}-${endCharacter}`,
          });
          message.success('定位成功');
        }}
      >
        定位
      </Button>
      {tab < 2 && (
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
