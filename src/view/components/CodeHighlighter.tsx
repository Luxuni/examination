import { Card } from 'antd';
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import github from 'react-syntax-highlighter/dist/esm/styles/hljs/github';

const CodeHeighlighter: React.FC<{ code: string }> = ({ code }) => {
  React.useEffect(() => {
    SyntaxHighlighter.registerLanguage('javascript', js);
  }, []);
  return (
    <Card bordered={false} hoverable>
      <SyntaxHighlighter style={github} className="max-h-96 overflow-scroll">
        {code}
      </SyntaxHighlighter>
    </Card>
  );
};

export default CodeHeighlighter;
