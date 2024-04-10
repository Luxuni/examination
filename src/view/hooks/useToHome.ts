import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '.';
import { selectUnikey } from '../features/unikeySlice';

const useToHome = () => {
  const navigate = useNavigate();
  const unikey = useAppSelector(selectUnikey);
  useEffect(() => {
    navigate('/');
  }, [unikey]);
};

export default useToHome;
