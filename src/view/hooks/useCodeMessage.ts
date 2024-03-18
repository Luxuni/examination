import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { changeUnikey } from '../features/unikeySlice';
import { changeUsername } from '../features/userSlice';

const useCodeMessage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = event.data;
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
