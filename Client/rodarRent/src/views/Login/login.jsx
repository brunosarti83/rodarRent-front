import { useState } from "react";
import validate from "./validateLogin";
import formImage from '../../assets/img/loginRegister/login.png'
import { Link } from "react-router-dom";
import routesHelper from "../../helpers/routes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const btnState = async (err) => {
    if (Object.keys(err).length === 0) setDisabledSubmit(false);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    validate({ ...loginData, [property]: value });
    setLoginData({ ...loginData, [property]: value });
    setErrors(validate({ ...loginData, [property]: value }));
    btnState(validate({ ...loginData, [property]: value }))
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/customers/login',loginData);
      
      if (response.status===200) {
        setIsLoggedIn(true);
        toast.success('Welcome!, '+loginData.email, {position: "top-left"});//Mensaje al inicio en vista de usuario
        setTimeout(() => {
          navigate("/cars")
        }, "4000");
      } else {
        toast.error('Invalid login credentials', {position: "top-left"});
      }
    } catch (error) {
      toast.error('Error during login:', error);
    }
  };

  return (
    <div className="w-full 2xl:h-noNavDesktop lg:h-noNavLaptop bg-white dark:bg-slate-900 duration-300 dark:text-gray-100 flex items-center justify-center">
      <div className="drop-shadow-md border bg-white rounded-l-3xl h-form  dark:bg-slate-900">
        <form className="px-16 py-28 flex flex-col flex-wrap w-full rounded-xl">
          <h1 className="font-poppins font-medium  text-4xl">Welcome back!{isLoggedIn ? loginData.email : ''}</h1>
          <h6 className="font-poppins pb-6 text-gray">
            Please enter your details
          </h6>
          <hr className="ml-8 mr-8 text-gray" />
          <label
            className="font-poppins flex m-1 justify-start"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950"
            type="text"
            name="email"
            placeholder="Type your e-mail"
            value={loginData.email}
            onChange={handleChange}
          />
          <span className={errors.email ? "font-poppins text-xs flex m-1 justify-start text-red" : null}>
            {errors.email}
          </span>
          <label
            className="font-poppins flex m-1 justify-start"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-md border border-gray dark:bg-slate-950"
            type="password"
            name="password"
            placeholder="Type your password"
            value={loginData.password}
            onChange={handleChange}
          />
          <span className={errors.password ? "font-poppins text-xs flex m-1 justify-start text-red" : null}>
            {errors.password}
          </span>
          <div className="flex flex-col mt-4 mb-4">
            <button
              className={disabledSubmit ? "font-poppins bg-blue cursor-not-allowed rounded-lg p-2 m-2 text-white":"font-poppins bg-blue cursor-pointer rounded-lg p-2 m-2 text-white"}
              onClick={handleLogin}
              disabled={disabledSubmit}
            >
              Sign In
            </button>
            <a
              className="font-poppins bg-white cursor-pointer rounded-lg p-1 m-2 flex flex-row justify-center items-center drop-shadow-md border border-gray dark:bg-slate-950 transition duration-300 ease-in-out hover:drop-shadow-none "
              href="#"
            >
              <img
                className="relative w-6 m-1"
                src="../../src/assets/img/google_logo.png"
                alt="Google img"
              ></img>
              Sign in with google
            </a>
          </div>
          <hr className="ml-8 mr-8 text-gray" />
          <div className="flex flex-col justify-center items-center m-5">
          <div className="flex justify-center items-center m-4">
            <p className="font-poppins text-gray text-xs m-2">
              Don't have an account?
            </p>
            <p
              className="text-sm underline decoration-solid font-poppins"
            >
              <Link to={routesHelper.register}>
                Sign up for free
              </Link>
            </p>
          </div>
            <a className="font-poppins text-gray text-xs" href="#">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
      <div className=" h-form drop-shadow-md rounded-r-3xl bg-blue py-28">
        <div className="text-4xl text-center font-semibold pb-6 text-white" >
          <h1>One step closer to</h1>
          <h1>your dream car!</h1>
        </div>
        <div className="w-100 h-auto" >
          <img className="w-max " src={formImage} alt="side-login-car-image" />
        </div>
      </div>
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
  );
};
export default Login;
