import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeHeighlighter: React.FC<{ code: string }> = ({ code }) => {
  return (
    <SyntaxHighlighter language="javascript" style={github}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeHeighlighter;
