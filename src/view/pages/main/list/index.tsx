import { useRef } from 'react';
import TableRender, { TableContext } from 'table-render';
import { searchApi, searchApi2,searchApi3 } from './components/schema/request';
import { setColumns } from './components/schema/table';
import { selectList } from '../../../features/listSlice';
import { useAppSelector } from '../../../hooks';

const List: React.FC = () => {
  const tableRef = useRef<TableContext>(null);
  const list = useAppSelector(selectList);
  return (
    <TableRender
      ref={tableRef}
      request={[
        { name: '我的评审(待修复)', api: searchApi3(list) as any },
        { name: '我的评审(已修复)', api: searchApi3(list) as any },
        { name: '我的问题(待修复)', api: searchApi3(list) as any },
        { name: '我的问题(已修复)', api: searchApi3(list) as any },
      ]}
      columns={setColumns(tableRef)}
    />
  );
};

export default List;
