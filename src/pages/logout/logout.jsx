import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('USERDATA');
    navigate('/Signup');
  }, [navigate]);

};

export default Logout;
