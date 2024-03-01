import { useEffect } from 'react';
import { changeUnikey } from '../features/unikeySlice';
import { useAppDispatch } from '.';

const useCodeMessage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = event.data;
      if (message.text) {
        dispatch(changeUnikey(message.text));
      }
    });
    return () => {
      window.removeEventListener('message', () => {});
    };
  }, []);
};

export default useCodeMessage;