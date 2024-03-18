import { useAsyncEffect } from 'ahooks';
import React from 'react';
import { Link } from 'react-router-dom';
import CodeHeighlighter from './components/CodeHighlighter';
import { selectUnikey } from './features/unikeySlice';
import { selectusername } from './features/userSlice';
import { useAppSelector, useCodeMessage, useDarkReader } from './hooks';
import { getUserList } from './services';

const App: React.FC = () => {
  useCodeMessage();
  useDarkReader();
  const unikey = useAppSelector(selectUnikey);
  const username = useAppSelector(selectusername)?.label ?? '';
  const [userList, setUserList] = React.useState<
    {
      name: string;
      userId: number;
    }[]
  >([]);
  useAsyncEffect(async () => {
    const data = await getUserList();
    console.log('data:', data);
    setUserList(data);
  }, []);
  return (
    <div className="h-screen p-4 overflow-scroll bg-[var(--vscode-notebook-editorBackground)] App">
      <Link to="/about">About</Link>
      <h2 className="text-2xl font-black text-center py-4">Hi!{username}</h2>
      <CodeHeighlighter code={unikey} />
      {userList.map((item) => (
        <div key={item.userId} className="text-lg font-bold">
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default App;
