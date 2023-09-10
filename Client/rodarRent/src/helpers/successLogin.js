import { setLocalStorage } from './storage';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const successLogin = (customerData, navigate) => {
  setLocalStorage('loginData', customerData);
  let name = ''
  customerData.given_name? name = customerData.given_name:name = customerData.name
  toast.success('Welcome!, ' + name, { position: 'top-left' }); //Mensaje al inicio en vista de usuario
  setTimeout(() => {
    navigate('/cars');
  }, '4000');
};
