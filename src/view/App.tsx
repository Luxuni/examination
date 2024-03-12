import React from 'react';
import { Link } from 'react-router-dom';
import CodeHeighlighter from './components/CodeHighlighter';
import { selectUnikey } from './features/unikeySlice';
import { selectusername } from './features/userSlice';
import { useAppSelector, useCodeMessage, useDarkReader } from './hooks';

const App: React.FC = () => {
  useCodeMessage();
  useDarkReader();
  const unikey = useAppSelector(selectUnikey);
  const username = useAppSelector(selectusername);
  return (
    <div className="h-screen p-4 overflow-scroll bg-[var(--vscode-notebook-editorBackground)] App">
      <Link to="/about">About</Link>
      <h2 className="text-2xl font-black text-center py-4">Hi!{username}</h2>
      <CodeHeighlighter code={unikey} />
    </div>
  );
};

export default App;
