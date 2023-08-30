import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username === "usuario" && password === "contraseña") {
      setIsLoggedIn(true);
    }
  };

  const googleLogin = () => {};

  return (
    <div className="relative flex flex-row">
      {isLoggedIn ? (
        <h4>Welcome back!, {username}!</h4>
      ) : (
        <form className="p-12 flex flex-col flex-wrap w-1/2 rounded-xl">
          <h1 className="font-poppins p-6 text-3xl">Welcome back!</h1>
          <hr className="ml-8 mr-8 text-gray"/>
          <h6 className="font-poppins p-4 text-gray">Please enter your details</h6>
          <label className="font-poppins flex m-1 justify-start" htmlFor="userName">
            E-mail
          </label>
          <input
            className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-xl border border-gray"
            type="text"
            name="userName"
            placeholder="Type your e-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="font-poppins flex m-1 justify-start" htmlFor="password">
            Password
          </label>
          <input
            className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-xl border border-gray"
            type="password"
            name="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col mt-4 mb-4">
          <button
            className="font-poppins bg-blue cursor-pointer rounded-lg p-2 m-2 text-white"
            onClick={handleLogin}
          >
            Sing In
          </button>
          <button
            className="font-poppins bg-white cursor-pointer rounded-lg p-1 m-2 flex flex-row justify-center items-center drop-shadow-xl border border-gray"
            onClick={googleLogin}
          >
            <img
              className="relative w-6 m-1"
              src="../../src/assets/img/google_logo.png"
              alt="Google img"
            ></img>
            Sing in with google
          </button>
          </div>
          <hr className="ml-8 mr-8 text-gray"/>
          <div className="flex justify-center items-center m-5">
            <p className="font-poppins text-gray text-xs m-2">Don't have an account?</p>
            <a className="text-sm underline decoration-solid font-poppins" href="">Sing up for free</a>
          </div>
        </form>
      )}

      <div className="bg-gray flex flex-col flex-wrap w-1/2">
        <img src="" alt="No existe la imagen" srcset="" />
      </div>
    </div>
  );
};
export default Login;
