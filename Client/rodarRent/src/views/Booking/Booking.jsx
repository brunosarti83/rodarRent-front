import { useState, useEffect } from "react";
import mercadoPagoImg from "../../assets/img/mercado-pago.png";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLocalStorage, getSessionStorage } from "../../helpers/storage";
import axios from "axios";
import {
  API_BASE_URL,
  createReservationUrl,
  paymentUrl,
} from "../../helpers/routes";

const Booking = () => {
  const customer = getLocalStorage("loginData");
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const carId = queryParams.get("parametro");
  const filterObject = getSessionStorage("filterObject");
  //console.log(filterObject);
  const [locations, setLocations] = useState([]);

  const [vehicle, setVehicle] = useState({
    price: "",
    image: "",
  });

  function getVehicleById(carId) {
    axios.get(`${API_BASE_URL}/vehicles/${carId}`).then((vehicle) => {
      setVehicle({
        title: vehicle.data.brand + " " + vehicle.data.model,
        price: vehicle.data.pricePerDay,
        image: vehicle.data.image,
      });
    });
  }
  let pickUp = "";
  async function getLocations () {
    await axios.get(`${API_BASE_URL}/locations`).then(({ data }) => {
      setLocations(data);
    });
  }
  
  useEffect(() => {
    getVehicleById(carId);
    getLocations();
  }, [carId]);
  
  let today = new Date();
  let año = today.getFullYear();
  let mes = today.getMonth() + 1; // Los meses comienzan desde 0, así que sumamos 1
  let díaS = today.getDate();
  let díaE = today.getDate() + 1;

  // Formatear la fecha en "yyyy-mm-dd"
  let fechaFormateadaStart =
    año +
    "-" +
    (mes < 10 ? "0" : "") +
    mes +
    "-" +
    (díaS < 10 ? "0" : "") +
    díaS;
  let fechaFormateadaEnd =
    año +
    "-" +
    (mes < 10 ? "0" : "") +
    mes +
    "-" +
    (díaE < 10 ? "0" : "") +
    díaE;

  const [bookingData, setBookingData] = useState({
    name: customer.name,
    lastName: customer.lastName,
    country: customer.country,
    city: customer.city,
    address: customer.address,
    address2: "",
    terms: false,
    startDate: filterObject?.startDate || fechaFormateadaStart,
    endDate: filterObject?.finishDate || fechaFormateadaEnd,
    pickUpLocationId: filterObject?.pickUpLocationId || "",
    returnLocationId: filterObject?.returnLocationId || "",
    totalAmount: 0
  });

  pickUp = locations.filter((e)=>e.id === bookingData.pickUpLocationId)[0]
  console.log(pickUp);
//console.log(locations);
  const dropOff = locations.filter((e)=>e.id === bookingData.returnLocationId)[0]
  //console.log(dropOff);

  let days = 0;
  days =
    (new Date(bookingData.endDate) - new Date(bookingData.startDate)) /
    (1000 * 60 * 60 * 24);

  bookingData.totalAmount = days * vehicle.price;

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setBookingData({ ...bookingData, [property]: value });
  };

  const reservationData = {
    VehicleId: carId,
    CustomerId: customer.id,
    startDate: bookingData.startDate,
    finishDate: bookingData.endDate,
    pricePerDay: vehicle.price,
    pickUpLocationId: bookingData.pickUpLocationId,
    returnLocationId: bookingData.returnLocationId,
  };

  const handleSubmit = async (event) => {
    if (document.getElementsByName("terms")[0].checked) {
      event.preventDefault();
      try {
        const response = await fetch(createReservationUrl(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        });

        if (response.ok) {
          const bookingResponse = await response.json();
          const payData = {
            id: bookingResponse.id,
            title: vehicle.title,
            quantity: days,
            currency_id: "ARS",
            unit_price: vehicle.price,
          };
          const queryParams = new URLSearchParams(payData).toString();
          const url = `${paymentUrl()}?${queryParams}`;
          //console.log(url);
          const responseUrl = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          const payLink = responseUrl.data;

          if (payLink) {
            window.location.href = payLink;
          } else {
            console.log("No se encontró un enlace de pago en la respuesta.");
          }
        } else {
          console.error("Error en la solicitud:", response.statusText);
        }
      } catch (error) {
        console.error("Error", error);
      }
    } else {
      toast.warn("First accept terms and conditions");
    }
  };

  return (
    <div className="max-h-full w-full 2xl:h-noNavDesktop lg:h-noNavLaptop bg-white dark:bg-slate-900 duration-300 dark:text-gray-100 flex items-center justify-center flex-col sm:flex-row">
      <div className="m-4 sticky sm:drop-shadow-md sm:border bg-white rounded-3xl  dark:bg-slate-900">
        <form className="px-6 sm:px-12 py-5 flex flex-col flex-wrap w-full justify-center">
          <div>
            <h1 className="font-poppins p-2 text-3xl">
              Thank you for your booking
            </h1>
            <h6 className="font-poppins p-2 text-gray">
              Please fill your pay method and your billing address
            </h6>
          </div>
          <div className="border rounded-3xl p-2 m-2 w-full">
            <h4 className="font-poppins p-1 text-xl">Billing Information</h4>
            <hr className="ml-2 mr-2 p-2 text-gray" />
            <div className="flex">
              <div className="w-11/12">
                <label
                  htmlFor="name"
                  className="font-poppins text-sm flex m-1 mb-0 justify-start"
                >
                  Name
                </label>
                <input
                  className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="w-11/12">
                <label
                  htmlFor="lastName"
                  className="font-poppins text-sm flex m-1 mb-0 justify-start"
                >
                  Last Name
                </label>
                <input
                  className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="lastName"
                  value={bookingData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-11/12">
                <label
                  htmlFor="country"
                  className="font-poppins text-sm flex m-1 mb-0 justify-start"
                >
                  Country
                </label>
                <input
                  className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="country"
                  value={bookingData.country}
                  onChange={handleChange}
                />
              </div>
              <div className="w-11/12">
                <label
                  htmlFor="city"
                  className="font-poppins text-sm flex m-1 mb-0 justify-start"
                >
                  City
                </label>
                <input
                  className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="city"
                  value={bookingData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-11/12">
                <label
                  htmlFor="address"
                  className="font-poppins text-sm flex m-1 mb-0 justify-start"
                >
                  Address
                </label>
                <input
                  className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="address"
                  value={bookingData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="w-11/12">
                <label
                  htmlFor="address2"
                  className="font-poppins text-sm flex m-1 mb-0 justify-start"
                >
                  Address 2
                </label>
                <input
                  className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray"
                  type="text"
                  name="address2"
                  value={bookingData.address2}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="border rounded-3xl p-2 m-2 w-full">
            <h4 className="font-poppins p-1 text-xl">Pay Method</h4>
            <hr className="ml-2 mr-2 p-2 text-gray" />
            <div className="flex items-center h-24">
              <img
                className="relative h-full m-1"
                src={mercadoPagoImg}
                alt="Mercado Pago Image"
              />
            </div>
            <div className="flex justify-end">
              <span className="font-poppins text-sm">
                Total to pay:{" "}
                <span className="font-poppins text-sm font-bold">
                  {" "}
                  $ {bookingData.totalAmount}
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start px-2 mx-2">
            <label
              className="font-poppins text-sm flex m-1 mb-0 justify-start items-center"
              htmlFor=""
            >
              <input
                className="m-2 cursor-pointer"
                type="checkbox"
                name="terms"
                onChange={handleChange}
              />
              I agree with terms conditions and privacy policy.
            </label>
            <label
              className="font-poppins text-sm flex m-1 mb-0 justify-start items-center"
              htmlFor=""
            >
              <input
                className="m-2 cursor-pointer"
                type="checkbox"
                name="info"
                onChange={handleChange}
              />
              I want to receive the latest information.
            </label>
          </div>
        </form>
        
      </div>
      <div className="max-h-full sm:w-1/4 m-4 flex flex-col px-6 sm:drop-shadow-md sm:border bg-white rounded-3xl  dark:bg-slate-900">
        <div className="flex justify-center">
          <img className="w-full" src={vehicle.image} alt="Car Image" />
        </div>
        <div className="font-poppins text-sm border rounded-lg py-3 px-1 my-2 dark:bg-slate-950">
          <span className="ml-2">Pick up date: {bookingData.startDate}</span>
        </div>
        <div className="font-poppins text-sm border rounded-lg py-3 px-1 my-2 dark:bg-slate-950">
        <span className="ml-2">Drop off date: {bookingData.endDate}</span>
        </div>
        <div className="flex flex-col font-poppins border bg-white rounded-lg my-2 p-2 dark:bg-slate-950">
          <span className="text-sm mb-1 mt-1">Pick Up Location: {pickUp ? pickUp.alias + " - " + pickUp.city : ""}</span>
        </div>
        <div className="flex flex-col font-poppins border bg-white rounded-lg my-2 p-2 dark:bg-slate-950">
        <span className="text-sm mb-1 mt-1">Drop Off Location: {dropOff ? dropOff.alias + " - " + dropOff.city : ""}</span>
        </div>
        <div className="flex flex-col border rounded-lg p-1 my-2">
          <div className="flex justify-between font-poppins text-sm p-1 my-2">
            <span className="">Price per day: </span>
            <span>$ {vehicle.price}</span>
          </div>
          <div className="flex justify-between font-poppins text-sm p-1 my-2">
            <span className="">Total days: </span>
            <span>
              {
                (days =
                  (new Date(bookingData.endDate) -
                    new Date(bookingData.startDate)) /
                  (1000 * 60 * 60 * 24))
              }
            </span>
          </div>
          <hr />
          <div className="flex justify-between font-poppins text-sm p-1 my-2">
            <span className="">Total amount: </span>
            <span>$ {bookingData.totalAmount}</span>
          </div>
        </div>
        <div className="flex justify-end">
        <button
            className="text-sm font-poppins bg-blue cursor-pointer rounded-lg p-2 m-2 text-white"
            onClick={()=>navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="text-sm font-poppins bg-blue cursor-pointer rounded-lg p-2 m-2 text-white"
            onClick={handleSubmit}
          >
            Reserve Deal
          </button>
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
};

export default Booking;
