import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import validatePass from './validatePass';
import { updatePasswordUrl } from '../../helpers/routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = (useParams) => {
  const { id } = useParams();
  console.log(useParams);
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    password: '',
    repeatPass: '',
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    password: '',
    repeatPass: '',
  });

  const [passwordError, setPasswordError] = useState(null);
  const [buttonText, setButtonText] = useState('Save');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setButtonText('Save Password');
    setPasswordFields({ ...passwordFields, [name]: value });
    setErrors(validatePass({ ...passwordFields, [name]: value }));
  };

  const handleUpdatePassword = async () => {
    try {
      if (passwordFields.password !== passwordFields.repeatPass) {
        setPasswordError('Passwords do not match');
        return;
      }

      const response = await fetch(updatePasswordUrl(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          currentPassword: passwordFields.currentPassword,
          newPassword: passwordFields.password,
        }),
      });
      
      setButtonText('Save');

      if (response.ok) {
        setPasswordError(null);
        toast.success('Password updated successfully');

      } else {
        console.error('Request error:', response.statusText);
        toast.error('Error updating password');
      }
    } catch (error) {
      console.error('Error', error);
      toast.error('Unexpected error');
    }
  };

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 duration-300 dark:text-gray-100 flex items-center justify-center">
      <div className="w-120 drop-shadow-md border bg-white rounded-3xl dark:bg-slate-900">
        <form className="w-120 px-16 py-5 flex flex-col flex-wrap  rounded-xl justify-center">
          <h1 className="font-poppins p-2 text-3xl">Change Password</h1>
          <hr className="ml-8 mr-8 p-2 text-gray" />
          <div className="flex">
            <div className="w-full">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="currentPassword"
              >
                Current Password
              </label>
              <div className="flex items-center">
                <input
                  className="w-full font-poppins text-sm text-black flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="password"
                  name="currentPassword"
                  value={passwordFields.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <span
                className={
                  errors.currentPassword
                    ? "font-poppins text-ls flex m-1 justify-start text-red"
                    : null
                }
              >
                {errors.currentPassword}
              </span>
            </div>
          </div>

          <div className="flex">
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="password"
              >
                New Password
              </label>
              <div className="flex items-center">
                <input
                  className="w-10/12 font-poppins text-sm text-black flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="password"
                  name="password"
                  value={passwordFields.password}
                  onChange={handlePasswordChange}
                />
                <span
                  className={
                    errors.password
                      ? "font-poppins text-ls flex m-1 justify-start text-red"
                      : null
                  }
                >
                  {errors.password}
                </span>
              </div>
              <span
                className={
                  errors.passwordMsj
                    ? "font-poppins text-ls flex m-1 justify-start text-red"
                    : null
                }
              >
                {errors.passwordMsj}
              </span>
            </div>
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 justify-start"
                htmlFor="repeatPass"
              >
                Repeat Password
              </label>
              <div className="flex items-center">
                <input
                  className="w-10/12 font-poppins text-sm text-black flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="password"
                  name="repeatPass"
                  value={passwordFields.repeatPass}
                  onChange={handlePasswordChange}
                />
                <span
                  className={
                    errors.repeatPass
                      ? "font-poppins text-ls flex m-1 justify-start text-red"
                      : null
                  }
                >
                  {errors.repeatPass}
                </span>
              </div>
              <span
                className={
                  errors.repeatPassMsj
                    ? "font-poppins text-ls flex m-1 justify-start text-red"
                    : null
                }
              >
                {errors.repeatPassMsj}
              </span>
            </div>
          </div>

          <div className="flex flex-col mt-4 mb-4">
            <button
              className="font-poppins bg-blue cursor-pointer rounded-lg p-1 m-2 text-white"
              onClick={handleUpdatePassword}
              disabled={Object.values(errors).some((error) => error)}
            >
              {buttonText}
            </button>
          </div>
        </form>
        <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default ChangePassword;
