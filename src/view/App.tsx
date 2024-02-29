import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

const App: React.FC = () => {
  const [text, setText] = useState('');
  useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = event.data;
      if (message.text) {
        setText(message.text);
      }
    });
    return () => {
      window.removeEventListener('message', () => {});
    };
  }, []);
  return (
    <div className="App">
      <Button type="primary">Button</Button>
      <div>{text}</div>
    </div>
  );
};

export default App;
