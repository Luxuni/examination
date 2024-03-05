import React from 'react';
import CodeHeighlighter from './components/CodeHighlighter';
import { selectUnikey } from './features/unikeySlice';
import { useAppSelector, useCodeMessage, useDarkReader } from './hooks';

const App: React.FC = () => {
  useCodeMessage();
  useDarkReader();
  const unikey = useAppSelector(selectUnikey);
  return (
    <div className="h-screen bg-white App">
      <CodeHeighlighter code={unikey} />
    </div>
  );
};

export default App;
