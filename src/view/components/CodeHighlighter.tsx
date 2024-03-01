import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeHeighlighter: React.FC<{ code: string }> = ({ code }) => {
  return (
    <SyntaxHighlighter language="javascript" style={stackoverflowLight}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeHeighlighter;
