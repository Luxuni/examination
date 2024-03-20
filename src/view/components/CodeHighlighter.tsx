import { Card, CardProps } from 'antd';
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import github from 'react-syntax-highlighter/dist/esm/styles/hljs/github';

function* characterGenerator(text: string, step: number = 1) {
  let index = 0;
  while (index < text.length) {
    yield text.slice(0, index);
    index += step;
  }
  yield text;
}

function delay() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      setTimeout(resolve);
    });
  });
}

const CodeHeighlighter: React.FC<{ code: string } & CardProps> = ({
  code,
  ...attr
}) => {
  const [displayedText, setDisplayedText] = React.useState('');
  React.useEffect(() => {
    SyntaxHighlighter.registerLanguage('javascript', js);
  }, []);
  React.useEffect(() => {
    const generator = characterGenerator(code, 4);

    async function handleNext() {
      for (let value of generator) {
        setDisplayedText(value);
        await delay(); // 每100毫秒显示4个字符
      }
    }

    handleNext();
  }, [code]);
  return (
    <Card {...attr}>
      <SyntaxHighlighter style={github}>{displayedText}</SyntaxHighlighter>
    </Card>
  );
};

export default CodeHeighlighter;
