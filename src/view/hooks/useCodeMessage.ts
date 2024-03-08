import { useEffect } from 'react';
import { changeUnikey } from '../features/unikeySlice';
import { useAppDispatch } from '.';
import { changeUsername } from '../features/userSlice';

const useCodeMessage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // 给vscode发送消息
    window.addEventListener('message', (event) => {
      const message = event.data;
      if (message.type === 'webpackOk') {
        // @ts-ignore
        window.__vscode__.postMessage({
          command: 'already',
          text: 'message is ok!',
        });
      }
      if (message.text) {
        dispatch(changeUnikey(message.text));
      }
      if (message.username) {
        console.log('username:', message.username);
        dispatch(changeUsername(message.username));
      }
    });
    return () => {
      window.removeEventListener('message', () => {});
    };
  }, []);
};

export default useCodeMessage;
