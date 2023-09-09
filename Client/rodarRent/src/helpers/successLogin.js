import { setLocalStorage } from './storage';
import { toast } from 'react-toastify';

export const successLogin = (customerData, navigate) => {
  
  //setLocalStorage('loginData', customerData);
  setTimeout(() => {
    navigate('/cars');
  }, '4000');
  toast.success('Welcome!, ' + customerData.given_name, { position: 'top-left' }); //Mensaje al inicio en vista de usuario
};
