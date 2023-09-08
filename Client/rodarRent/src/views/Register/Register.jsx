import formImage from "../../assets/img/loginRegister/login.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import routesHelper from "../../helpers/routes";
import validateRegister from "./validateRegister";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const btnState = async (err) => {
    if (Object.keys(err).length === 0) setDisabledSubmit(false);
  };
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    personalId: "",
    birthDate: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    password: "",
    repeatPass: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    personalId: "",
    birthDate: "",
    address: "",
    country: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    emailMsj:"",
    password: "",
    passwordMsj: "",
    repeatPass: "",
    repeatPassMsj: "",
    //requireMsj: "* (Require information)",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    validateRegister({ ...userData, [property]: value });
    setUserData({ ...userData, [property]: value });
    setErrors(validateRegister({ ...userData, [property]: value }));
    btnState(validateRegister({ ...userData, [property]: value }))
  };

  const data = {
  name: userData["name"],
  lastName: userData["lastName"],
  personalId: userData["personalId"],
  birthDate: userData["birthDate"],
  address: userData["address"],
  city: userData["city"],
  country: userData["country"],
  zipCode: userData["zipCode"],
  phoneNumber: userData["phoneNumber"],
  email: userData["email"],
  password: userData["password"],}

  
  const handleSubmit = async (event) => {
      //console.log(data);
    event.preventDefault()
    await axios.post('http://localhost:3001/customers', data).then(response=>{
      toast.success('Registered user!', {position: "top-left"});
      navigate("/login")
    }).catch ((error) =>{
      toast.error(error, {position: "top-left"});
    })
  };

  return (
    <div className="max-h-full w-full 2xl:h-noNavDesktop lg:h-noNavLaptop bg-white dark:bg-slate-900 duration-300 dark:text-gray-100 flex items-center justify-center">
      <div className="sticky drop-shadow-md border bg-white rounded-l-3xl  dark:bg-slate-900">
        <form className="px-16 py-5 flex flex-col flex-wrap w-full rounded-xl justify-center">
          <h1 className="font-poppins p-2 text-3xl">Welcome to RodarRent!</h1>
          <h6 className="font-poppins p-2 text-gray">Please enter your info</h6>
          <hr className="ml-8 mr-8 p-2 text-gray" />
          <div className="flex">
          <div className="w-2/4">
          <label
            className="font-poppins text-sm flex m-1 mb-0 justify-start"
            htmlFor="name"
          >
            Name
          </label>
          <div className="flex items-center">
          <input
            className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray "
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <span className={errors.name ? "font-poppins text-ls flex m-1 justify-start text-red": null}>{errors.name}</span>
          </div>
          </div>
          <div className="w-2/4">
          <label
            className="font-poppins text-sm flex m-1 mb-0 justify-start"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <div className="flex items-center">
          <input
            className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
          <span
            className={
              errors.lastName
                ? "font-poppins text-ls flex m-1 justify-start text-red"
                : null
            }
          >
            {errors.lastName}
          </span>
          </div>
          </div>
          </div>
          <div className="flex">
          <div className="w-2/4">
          <label
            className="font-poppins text-sm flex m-1 mb-0 justify-start"
            htmlFor="email"
          >
            E-mail
          </label>
          <div className="flex items-center">
          <input
            className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <span
            className={
              errors.email
                ? "font-poppins text-ls flex m-1 justify-start text-red"
                : null
            }
          >
            {errors.email}
          </span>
          </div>
          <span
            className={
              errors.emailMsj
                ? "font-poppins text-ls flex m-1 justify-start text-red"
                : null
            }
          >
            {errors.emailMsj}
          </span>
          </div>
          <div className="w-2/4">
          <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <div className="flex items-center">
              <input
                className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
              />
              <span
                className={
                  errors.phoneNumber
                    ? "font-poppins text-ls flex m-1 justify-start text-red"
                    : null
                }
              >
                {errors.phoneNumber}
              </span>
              </div>
              </div>
              </div>
          <div className="flex">
          <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="personalId"
              >
                PersonalID
              </label>
              <div className="flex items-center">
              <input
                className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                type="text"
                name="personalId"
                value={userData.personalId}
                onChange={handleChange}
              />
              <span
                className={
                  errors.personalId
                    ? "font-poppins text-ls flex m-1 justify-start text-red"
                    : null
                }
              >
                {errors.personalId}
              </span>
              </div>
            </div>
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="birthDate"
              >
                Birth Date
              </label>
              <div className="flex items-center">
              <input
                className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                type="date"
                name="birthDate"
                value={userData.birthDate}
                onChange={handleChange}
              />
              <span
                className={
                  errors.birthDate
                    ? "font-poppins text-ls flex m-1 justify-start text-red"
                    : null
                }
              >
                {errors.birthDate}
              </span>
              </div>
            </div>
          </div>
          <div className="flex">
          <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="country"
              >
                Country
              </label>
              <div className="flex items-center">
              <input
                className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                type="text"
                name="country"
                value={userData.country}
                onChange={handleChange}
              />
              <span
                className={
                  errors.country
                    ? "font-poppins text-ls flex m-1 justify-start text-red"
                    : null
                }
              >
                {errors.country}
              </span>
              </div>
            </div>
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="city"
              >
                City
              </label>
              <div className="flex items-center">
              <input
                className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                type="text"
                name="city"
                value={userData.city}
                onChange={handleChange}
              />
              <span
                className={
                  errors.city
                    ? "font-poppins text-ls flex m-1 justify-start text-red"
                    : null
                }
              >
                {errors.city}
              </span>
              </div>
            </div>
          </div>
          <div className="flex">
          <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="address"
              >
                Address
              </label>
              <div className="flex items-center">
              <input
                className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
              />
              <span
                className={
                  errors.address
                    ? "font-poppins text-ls flex m-1 justify-start text-red"
                    : null
                }
              >
                {errors.address}
              </span>
              </div>
            </div>
            <div className="w-2/4">
              <label
                className="font-poppins text-sm flex m-1 mb-0 justify-start"
                htmlFor="zipCode"
              >
                Zip Code
              </label>
              <div className="flex items-center">
              <input
                className="w-10/12 font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                type="text"
                name="zipCode"
                value={userData.zipCode}
                onChange={handleChange}
              />
              <span
                className={
                  errors.zipCode
                    ? "font-poppins text-ls flex m-1 justify-start text-red"
                    : null
                }
              >
                {errors.zipCode}
              </span>
              </div>
            </div>
          </div>
          <div className="flex">
          <div className="w-2/4">
          <label
            className="font-poppins text-sm flex m-1 mb-0 justify-start"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex items-center">
          <input
            className="w-10/12 font-poppins text-sm text-black flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
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
            value={userData.repeatPass}
            onChange={handleChange}
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
              className={disabledSubmit ? "font-poppins bg-blue cursor-not-allowed rounded-lg p-1 m-2 text-white":"font-poppins bg-blue cursor-pointer rounded-lg p-1 m-2 text-white"}
              onClick={handleSubmit}
              disabled={disabledSubmit}
            >
              Sign Up
            </button>
            <button className="font-poppins text-black bg-white cursor-pointer rounded-lg p-1 m-2 flex flex-row justify-center items-center drop-shadow-md border border-gray">
              <img
                className="relative w-6 m-1"
                src="../../src/assets/img/google_logo.png"
                alt="Google img"
              ></img>
              Sign up with google
            </button>
          </div>
          <hr className="ml-8 mr-8 text-gray" />
          <div className="flex justify-center items-center m-5">
            <p className="font-poppins text-gray text-xs m-2">
              Already have an account?
            </p>
            <p className="text-sm underline decoration-solid font-poppins">
              <Link to={routesHelper.login}>Sign in</Link>
            </p>
          </div>
        </form>
      </div>
      <div className=" h-register drop-shadow-md rounded-r-3xl bg-blue py-28">
        <div className="text-4xl text-center font-semibold pb-6 text-white">
          <h1>One step closer to</h1>
          <h1>your dream car!</h1>
        </div>
        <div className="w-120 h-auto">
          <img className="w-max " src={formImage} alt="side-login-car-image" />
        </div>
      </div>
      <ToastContainer
      position="top-left"
      autoClose={5000}
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
}

export default Register;