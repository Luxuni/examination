import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { changeRange } from '../features/rangeSlice';
import { changeUnikey } from '../features/unikeySlice';
import { changeUsername } from '../features/userSlice';

const useCodeMessage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = event.data;
      console.log(message, 'message');
      if (message.text) {
        dispatch(changeUnikey(message.text));
      }
      if (message.range) {
        dispatch(changeRange(message.range));
      }
      if (message.userMessage) {
        dispatch(changeUsername(message.userMessage));
      }
    });
    return () => {
      window.removeEventListener('message', () => {});
    };
  }, []);
};

export default useCodeMessage;
