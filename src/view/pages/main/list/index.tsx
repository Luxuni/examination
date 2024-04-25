import { Dropdown } from 'antd';
import { useRef } from 'react';
import TableRender, { TableContext } from 'table-render';
import { selectusername } from '../../../features/userSlice';
import { useAppSelector } from '../../../hooks';
import { getCodeList } from '../../../services';
import { createColumns } from './components/schema/table';

const List: React.FC = () => {
  const tableRef = useRef<TableContext | null>(null);
  const userMessage = useAppSelector(selectusername);
  const contextMenuRow = useRef<any>({});

  const getCodeListByPagingFactory =
    (type: 1 | 2 | 3 | 4) =>
    async (params: { current: number; pageSize: number }) => {
      const { current, pageSize } = params;
      const res = await getCodeList({
        operator: userMessage?.userId ?? 0,
        type,
      });
      return {
        data: res.slice((current - 1) * pageSize, current * pageSize),
        total: res.length,
      };
    };

  return (
    <TableRender
      onRow={(record) => {
        return {
          onContextMenu: () => {
            contextMenuRow.current = record;
          },
        };
      }}
      components={{
        body: {
          row: (props: any) => (
            <Dropdown
              menu={{
                items: [
                  {
                    label: '定位',
                    key: 'orientation',
                  },
                  {
                    label: '删除',
                    key: 'delete',
                  },
                ],
                onClick: ({ key }) => {
                  const { filePath, startLine, endLine } =
                    contextMenuRow.current;
                  switch (key) {
                    case 'orientation':
                      console.log('orientation', contextMenuRow.current);
                      // @ts-ignore
                      window.__vscode__.postMessage({
                        command: 'position',
                        text: `${filePath};,${startLine}-0;,${endLine}-0`,
                      });
                      break;
                    default:
                      break;
                  }
                },
              }}
              trigger={['contextMenu']}
            >
              <tr {...props} />
            </Dropdown>
          ),
        },
      }}
      ref={tableRef}
      request={[
        { name: '我的评审未修复', api: getCodeListByPagingFactory(3) },
        { name: '我的评审已修复', api: getCodeListByPagingFactory(4) },
        { name: '我的问题未修复', api: getCodeListByPagingFactory(1) },
        { name: '我的问题已修复', api: getCodeListByPagingFactory(2) },
      ]}
      columns={createColumns()}
    />
  );
};

export default List;
