import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { successLogin } from '../../helpers/successLogin';
import Loader from '../../components/Loader/Loader';

const GoogleAuthAux = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const userParam = queryParams.get('userData');
  const userData = userParam ? JSON.parse(userParam) : null;

  useEffect(() => {
    successLogin(userData, navigate);
    setTimeout(() => {
      navigate('/cars');
    }, '4000');
  }, []);
  return <div><Loader /></div>;
};

export default GoogleAuthAux;
