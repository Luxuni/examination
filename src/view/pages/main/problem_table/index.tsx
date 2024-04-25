import { Alert, Dropdown, Modal, message } from 'antd';
import { useRef } from 'react';
import TableRender, { TableContext } from 'table-render';
import { rangeState } from '../../../features/rangeSlice';
import { selectusername } from '../../../features/userSlice';
import { useAppSelector } from '../../../hooks';
import { deleteCode, fix, getCodeList } from '../../../services';
import { createColumns } from './components/schema/table';

const ProblemTable: React.FC = () => {
  const tableRef = useRef<TableContext | null>(null);
  const [modal, contextHolder] = Modal.useModal();
  const userMessage = useAppSelector(selectusername);
  const contextMenuRow = useRef<rangeState['range']>(null);

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
    <>
      {contextHolder}
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
                    {
                      label: '修复',
                      key: 'fix',
                    },
                  ],
                  onClick: ({ key }) => {
                    const { filePath, startLine, endLine } =
                      contextMenuRow.current!;
                    if (key === 'orientation') {
                      // @ts-ignore
                      window.__vscode__.postMessage({
                        command: 'position',
                        text: `${filePath};,${startLine}-0;,${endLine}-0`,
                      });
                    } else if (key === 'delete') {
                      modal.confirm({
                        title: '删除',
                        content: '确定删除该条问题吗？',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: async () => {
                          await deleteCode({
                            idList: [contextMenuRow.current!.id],
                          });
                          message.success('删除成功');
                          tableRef.current?.refresh();
                        },
                      });
                    } else if (key === 'fix') {
                      modal.confirm({
                        title: '修复',
                        content: '确定修复该条问题吗？',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: async () => {
                          await fix({
                            idList: [contextMenuRow.current!.id],
                          });
                          message.success('修复成功');
                          tableRef.current?.refresh();
                        },
                      });
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
        tableWrapper={(table) => (
          <div>
            <Alert
              message="右键点击表格行可查看更多操作哦～"
              type="warning"
              closable
              style={{ marginBottom: 16 }}
            />
            {table}
          </div>
        )}
        ref={tableRef}
        request={[
          { name: '我的评审未修复', api: getCodeListByPagingFactory(3) },
          { name: '我的评审已修复', api: getCodeListByPagingFactory(4) },
          { name: '我的问题未修复', api: getCodeListByPagingFactory(1) },
          { name: '我的问题已修复', api: getCodeListByPagingFactory(2) },
        ]}
        columns={createColumns()}
      />
    </>
  );
};

export default ProblemTable;
