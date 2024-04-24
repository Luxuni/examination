import { useRef } from 'react';
import TableRender, { TableContext } from 'table-render';
import { selectusername } from '../../../features/userSlice';
import { useAppSelector } from '../../../hooks';
import { getCodeList } from '../../../services';
import { createColumns } from './components/schema/table';

const List: React.FC = () => {
  const tableRef = useRef<TableContext | null>(null);
  const userMessage = useAppSelector(selectusername);

  return (
    <TableRender
      ref={tableRef}
      request={[
        {
          name: '我的问题(待修复)',
          api: getCodeList({
            operator: userMessage?.userId ?? 0,
            type: 3,
          }) as any,
        },
        // { name: '我的评审(已修复)', api: searchApi3(list) as any },
        // { name: '我的问题(待修复)', api: searchApi3(list) as any },
        // { name: '我的问题(已修复)', api: searchApi3(list) as any },
      ]}
      columns={createColumns(tableRef)}
    />
  );
};

export default List;
