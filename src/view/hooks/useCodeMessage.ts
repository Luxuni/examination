import { useEffect } from 'react';
import { changeUnikey } from '../features/unikeySlice';
import { useAppDispatch } from '.';
import { changeUsername } from '../features/userSlice';

const useCodeMessage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
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
      if (message.userMessage) {
        console.log('userMessage:', message.userMessage);
        dispatch(changeUsername(message.userMessage));
      }
    });
    return () => {
      window.removeEventListener('message', () => {});
    };
  }, []);
};

export default useCodeMessage;
