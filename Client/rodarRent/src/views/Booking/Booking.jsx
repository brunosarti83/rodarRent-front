import { useState } from "react";
import mercadoPagoImg from "../../assets/img/mercado-pago.png"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Booking = () => {
    const [bookingData, setBookingData] = useState({
        name: "",
        lastName: "",
        country: "",
        city: "",
        address: "",
        address2: "",
        method: "",
      });

const handleChange = ()=>{
    console.log("Change input");
}
const handleSubmit = (event)=>{
    event.preventDefault()
    toast("Change input");

}
  return (
    <div className="max-h-full w-full 2xl:h-noNavDesktop lg:h-noNavLaptop bg-white dark:bg-slate-900 duration-300 dark:text-gray-100 flex items-center justify-center">
      <div className="sticky drop-shadow-md border bg-white rounded-3xl  dark:bg-slate-900">
      <form className="px-12 py-5 flex flex-col flex-wrap w-full justify-center">
        <div>
          <h1 className="font-poppins p-2 text-3xl">Thank you for your booking</h1>
          <h6 className="font-poppins p-2 text-gray">Please fill your pay method and your billing address</h6>
        </div>
        <div className="border rounded-3xl p-2 m-2 w-full">
          <h4 className="font-poppins p-1 text-xl">Billing Information</h4>
          <hr className="ml-2 mr-2 p-2 text-gray" />
          <div className="flex">
          <div className="w-11/12">
            <label htmlFor="name" className="font-poppins text-sm flex m-1 mb-0 justify-start">Name</label>
            <input className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray"
              type="text"
              name="name"
              value={bookingData.name}
              onChange={handleChange}
            />
            </div>
            <div className="w-11/12">
            <label htmlFor="lastName" className="font-poppins text-sm flex m-1 mb-0 justify-start">Last Name</label>
            <input className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray"
              type="text"
              name="lastName"
              value={bookingData.lastName}
              onChange={handleChange}
            />
          </div>
          </div>
          <div className="flex">
          <div className="w-11/12">
            <label htmlFor="country" className="font-poppins text-sm flex m-1 mb-0 justify-start">Country</label>
            <input className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray"
              type="text"
              name="country"
              value={bookingData.country}
              onChange={handleChange}
            />
            </div>
            <div className="w-11/12">
            <label htmlFor="city" className="font-poppins text-sm flex m-1 mb-0 justify-start">City</label>
            <input className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray"
              type="text"
              name="city"
              value={bookingData.city}
              onChange={handleChange}
            />
          </div>
          </div>
          <div className="flex">
          <div className="w-11/12">
            <label htmlFor="address" className="font-poppins text-sm flex m-1 mb-0 justify-start">Address</label>
            <input className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray"
              type="text"
              name="address"
              value={bookingData.address}
              onChange={handleChange}
            />
            </div>
            <div className="w-11/12">
            <label htmlFor="address2" className="font-poppins text-sm flex m-1 mb-0 justify-start">Address 2</label>
            <input className="w-10/12 font-poppins text-sm flex justify-start items-center p-1 m-1 text-black rounded-lg drop-shadow-md border border-gray"
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
          <div className="flex justify-around">
            <label className="font-poppins text-sm flex m-1 mb-0 justify-start items-center">
            <input className="m-2" type="radio" name="method" value={bookingData.method}/>
            Credit Card
            </label>
            <label className="font-poppins text-sm flex m-1 mb-0 justify-start items-center">
            <input className="m-2" type="radio" name="method" value={bookingData.method}/>
            Wire Transfer
            </label>
          </div>
          <div className="flex items-center h-24">
            <img className="relative h-full m-1" src={mercadoPagoImg} alt="Mercado Pago Image" />
          </div>
          <div className="flex justify-end">
            <button className="font-poppins bg-blue cursor-pointer rounded-lg p-1 m-2 text-white" onClick={handleSubmit}>Reserve Deal</button>
          </div>
        </div>
      </form>
      </div>
      <div>
        <h1>Tarjeta Vehiculo</h1>
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
