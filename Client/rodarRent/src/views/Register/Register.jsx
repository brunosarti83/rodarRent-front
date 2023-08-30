import React, { useState } from "react";
import image from "../../assets/img/landingImage.png";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
    password: "",
    repeatPass: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setUserData({ ...userData, [property]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault(); //EN EL EVENTO SUBMIT EVITA QUE SE RECARGUE LA PAGINA
    alert("Exito");
  };

  return (
    <div className="relative flex flex-row">
      <form className="z-20  backdrop-blur-sm p-12 flex flex-col flex-wrap w-1/2 rounded-xl">
        <h1 className="font-poppins p-2 text-3xl">Welcome to RodarRent!</h1>
        <h6 className="font-poppins p-2 text-gray">Please enter your info</h6>
        <hr className="ml-8 mr-8 p-2 text-gray" />
        <label className="font-poppins flex m-1 justify-start" htmlFor="name">
          Name
        </label>
        <input
          className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-xl border border-gray"
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
        <label
          className="font-poppins flex m-1 justify-start"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-xl border border-gray"
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
        />
        <label className="font-poppins flex m-1 justify-start" htmlFor="email">
          E-mail
        </label>
        <input
          className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-xl border border-gray"
          type="text"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <label
          className="font-poppins flex m-1 justify-start"
          htmlFor="address"
        >
          Address
        </label>
        <input
          className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-xl border border-gray"
          type="text"
          name="address"
          value={userData.address}
          onChange={handleChange}
        />
        <label
          className="font-poppins flex m-1 justify-start"
          htmlFor="country"
        >
          Country
        </label>
        <input
          className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-xl border border-gray"
          type="text"
          name="country"
          value={userData.country}
          onChange={handleChange}
        />
        <label className="font-poppins flex m-1 justify-start" htmlFor="city">
          City
        </label>
        <input
          className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-xl border border-gray"
          type="text"
          name="city"
          value={userData.city}
          onChange={handleChange}
        />
        <label
          className="font-poppins flex m-1 justify-start"
          htmlFor="postalCode"
        >
          Postal Code
        </label>
        <input
          className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-xl border border-gray"
          type="text"
          name="postalCode"
          value={userData.postalCode}
          onChange={handleChange}
        />
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
          value={userData.password}
          onChange={handleChange}
        />
        <label
          className="font-poppins flex m-1 justify-start"
          htmlFor="repeatPass"
        >
          Repeat Password
        </label>
        <input
          className="font-poppins text-sm flex justify-start items-center p-2 m-1 rounded-lg drop-shadow-xl border border-gray"
          type="password"
          name="repeatPass"
          value={userData.repeatPass}
          onChange={handleChange}
        />
        <div className="flex flex-col mt-4 mb-4">
          <button
            className="font-poppins bg-blue cursor-pointer rounded-lg p-2 m-2 text-white"
            onClick={handleSubmit}
          >
            Sing Up
          </button>
          <button className="font-poppins bg-white cursor-pointer rounded-lg p-1 m-2 flex flex-row justify-center items-center drop-shadow-xl border border-gray">
            <img
              className="relative w-6 m-1"
              src="../../src/assets/img/google_logo.png"
              alt="Google img"
            ></img>
            Sing up with google
          </button>
        </div>
        <hr className="ml-8 mr-8 text-gray" />
        <div className="flex justify-center items-center m-5">
          <p className="font-poppins text-gray text-xs m-2">
            Already have an account?
          </p>
          <a
            className="text-sm underline decoration-solid font-poppins"
            href=""
          >
            Sing in
          </a>
        </div>
      </form>

      <div className="z-10 flex flex-col flex-wrap w-1/2 items-center mt-60">
        <img
          className="fixed w-4/5"
          src={image}
          alt="No existe la imagen"
          srcset=""
        />
      </div>
    </div>
  );
};
export default Register;
