import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Aquí podrías realizar la lógica de autenticación real, por ejemplo, una llamada a un servidor
    // En este ejemplo simple, solo compararemos el nombre de usuario y la contraseña en el cliente.
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
        <form className="bg-gray-light p-5 flex flex-col flex-wrap w-1/2 rounded-xl">
          <h1 className="font-poppins p-4 font-light">Welcome back!</h1>
          <hr />
          <h6 className="p-4">Please enter your details</h6>
          <label className="flex m-1 justify-start" htmlFor="userName">
            E-mail
          </label>
          <input
            className="flex justify-start items-center p-1 m-1 rounded-lg"
            type="text"
            name="userName"
            placeholder="Type your e-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="flex m-1 justify-start" htmlFor="password">
            Password
          </label>
          <input
            className="flex p-1 m-1 rounded-lg justify-start"
            type="password"
            name="password"
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue cursor-pointer rounded-lg p-1 m-2 text-white"
            onClick={handleLogin}
          >
            Sing In
          </button>
          <button
            className="bg-white cursor-pointer rounded-lg p-1 m-2 flex flex-row justify-center items-center"
            onClick={googleLogin}
          ><span className="relative w-7"><img src="../../src/assets/img/google_logo.png" alt="Google img"></img></span>
            Sing
            in with google
          </button>
        </form>
      )}
      <hr />

      <div className="bg-gray p-1 m-1 flex flex-col flex-wrap w-1/2 rounded-xl">
        <img src="" alt="No existe la imagen" srcset="" />
      </div>
    </div>
  );
};
export default Login;
