import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import CodeHeighlighter from './components/CodeHighlighter';
import { selectUnikey } from './features/unikeySlice';
import { selectusername } from './features/userSlice';
import { useAppSelector, useCodeMessage, useDarkReader } from './hooks';

const App: React.FC = () => {
  useCodeMessage();
  useDarkReader();
  const unikey = useAppSelector(selectUnikey);
  const username = useAppSelector(selectusername)?.label ?? '';
  const { data, error, isLoading } = useSWR(
    'https://ideaplugin.lonsun.cn/codereview/codeReview/getUserList',
    (url) => fetch(url).then((res) => res.json()),
  );
  return (
    <div className="h-screen p-4 overflow-scroll bg-[var(--vscode-notebook-editorBackground)] App">
      <Link to="/about">About</Link>
      <h2 className="text-2xl font-black text-center py-4">Hi!{username}</h2>
      <CodeHeighlighter code={unikey} />
      {data?.map((item: any) => (
        <div key={item.userId} className="text-lg font-bold">
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default App;
