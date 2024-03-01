import { Button } from 'antd';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { selectUnikey } from './features/unikeySlice';
import { useAppSelector, useCodeMessage } from './hooks';

const App: React.FC = () => {
  useCodeMessage();
  const unikey = useAppSelector(selectUnikey);
  console.log(unikey);

  return (
    <div className="App">
      <Button type="primary">Button</Button>
      <SyntaxHighlighter language="javascript" style={docco}>
        {unikey}
      </SyntaxHighlighter>
    </div>
  );
};

export default App;
