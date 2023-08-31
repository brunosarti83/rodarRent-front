import React, { useState } from "react";
import image from "../../assets/img/landingImage.png";
import validate from "./validateLogin";
//import { useHistory } from "react-router-dom";

const Login = () => {
  //const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = {
    email: "admin@gmail.com",
    password: "Admin1",
  };

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
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (
      loginData.email === user.email &&
      loginData.password === user.password
    ) {
      alert("Welcome!!");
      setIsLoggedIn(true);
      //history.push("/home");
    } else {
      alert("There's been a problem!!");
    }
  };

  return (
    <div className="relative flex flex-row">
      {isLoggedIn ? (
        <h4>Welcome back!, {loginData.email}!</h4>
      ) : (
        <form className="z-20 backdrop-blur-sm p-12 flex flex-col flex-wrap w-1/2 rounded-xl">
          <h1 className="font-poppins p-6 text-4xl">Welcome back!</h1>
          <hr className="ml-8 mr-8 text-gray" />
          <h6 className="font-poppins p-4 text-gray">
            Please enter your details
          </h6>
          <label
            className="font-poppins flex m-1 justify-start"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-xl border border-gray"
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
            className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-xl border border-gray"
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
              className="font-poppins bg-blue cursor-pointer rounded-lg p-2 m-2 text-white"
              onClick={handleLogin}
            >
              Sing In
            </button>
            <a
              className="font-poppins bg-white cursor-pointer rounded-lg p-1 m-2 flex flex-row justify-center items-center drop-shadow-xl border border-gray"
              href="#"
            >
              <img
                className="relative w-6 m-1"
                src="../../src/assets/img/google_logo.png"
                alt="Google img"
              ></img>
              Sing in with google
            </a>
          </div>
          <hr className="ml-8 mr-8 text-gray" />
          <div className="flex justify-center items-center m-5">
            <p className="font-poppins text-gray text-xs m-2">
              Don't have an account?
            </p>
            <a
              className="text-sm underline decoration-solid font-poppins"
              href=""
            >
              Sing up for free
            </a>
          </div>
        </form>
      )}

      <div className="z-10 flex flex-col flex-wrap w-1/2 items-center justify-center">
        <img className="fixed w-4/5" src={image} alt="No existe la imagen" />
      </div>
    </div>
  );
};
export default Login;
