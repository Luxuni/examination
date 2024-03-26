import { Card, CardProps } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import github from 'react-syntax-highlighter/dist/esm/styles/hljs/github';

function* characterGenerator(text: string, step: number = 1) {
  let index = 0;
  while (index < text.length) {
    yield text.slice(0, index) + '█';
    index += step;
  }
  yield text;
}

const CodeHeighlighter: React.FC<{ code: string } & CardProps> = ({
  code,
  ...attr
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const frameRef = useRef<number | null>(null);
  const generatorRef = useRef<Generator<string, void, unknown>>(
    characterGenerator(code, 2),
  );

  useEffect(() => {
    SyntaxHighlighter.registerLanguage('javascript', js);
  }, []);

  useEffect(() => {
    generatorRef.current = characterGenerator(code, 2);
    setDisplayedText('');

    const animate = () => {
      const result = generatorRef.current.next();
      if (!result.done) {
        setDisplayedText(result.value);
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [code]);

  return (
    <Card {...attr}>
      <SyntaxHighlighter style={github}>{displayedText}</SyntaxHighlighter>
    </Card>
  );
};

export default CodeHeighlighter;
