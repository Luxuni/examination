import { Tooltip } from 'antd';
import { ProColumnsType } from 'table-render';

export const createColumns = (): ProColumnsType => {
  return [
    {
      title: '项目名称',
      dataIndex: 'projectName',
      valueType: 'text',
      width: '120px',
      ellipsis: {
        showTitle: false,
      },
      render: (projectName: string) => (
        <Tooltip placement="top" title={projectName}>
          {projectName}
        </Tooltip>
      ),
    },
    {
      title: '模块名',
      dataIndex: 'moduleName',
      valueType: 'text',
      width: '120px',
      ellipsis: {
        showTitle: false,
      },
      render: (moduleName: string) => (
        <Tooltip placement="top" title={moduleName}>
          {moduleName}
        </Tooltip>
      ),
    },
    {
      title: '文件名',
      dataIndex: 'fileName',
      valueType: 'text',
      width: '120px',
      ellipsis: {
        showTitle: false,
      },
      render: (fileName: string) => (
        <Tooltip placement="top" title={fileName}>
          {fileName}
        </Tooltip>
      ),
    },
    {
      title: '作者',
      dataIndex: 'author',
      valueType: 'text',
      width: '120px',
      ellipsis: {
        showTitle: false,
      },
      render: (author: string) => (
        <Tooltip placement="top" title={author}>
          {author}
        </Tooltip>
      ),
    },
    {
      title: '问题类型',
      dataIndex: 'errorDistName',
      valueType: 'text',
      width: '120px',
      ellipsis: {
        showTitle: false,
      },
      render: (errorDistName: string) => (
        <Tooltip placement="top" title={errorDistName}>
          {errorDistName}
        </Tooltip>
      ),
    },
    {
      title: '评审日期',
      dataIndex: 'createDate',
      valueType: 'text',
      width: '120px',
      ellipsis: {
        showTitle: false,
      },
      render: (createDate: string) => (
        <Tooltip placement="top" title={createDate}>
          {createDate}
        </Tooltip>
      ),
    },
    {
      title: '评审意见',
      dataIndex: 'comment',
      valueType: 'text',
      width: '120px',
      ellipsis: {
        showTitle: false,
      },
      render: (comment: string) => (
        <Tooltip placement="top" title={comment}>
          {comment}
        </Tooltip>
      ),
    },
  ];
};
