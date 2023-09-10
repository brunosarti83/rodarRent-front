import { useEffect, useState } from "react";
import mercadoPagoImg from "../../assets/img/mercado-pago.png"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import carImage from "../../assets/img/landingImage.webp"
const Booking = () => {

  let days = 0;
  
  const [bookingData, setBookingData] = useState({
    name: "Customer",
    lastName: "Customer Last Name",
    country: "Customer Country",
    city: "Customer City",
    address: "Customer Address",
    address2: "Customer Last Name",
    payMethod: "Credit Card",
    image: carImage,
    terms: false,
    startDate: "2023-05-12",
    endDate: "2023-05-17",
    price: 140,
    totalAmount: 0,
  });
  
    days = (new Date(bookingData.endDate)-new Date(bookingData.startDate))/(1000*60*60*24)
    bookingData.totalAmount = days * bookingData.price
    //console.log(days);

  const handleChange = (event)=>{
    const property = event.target.name;
    const value = event.target.value;
    setBookingData({ ...bookingData, [property]: value })
  }

const handleSubmit = (event)=>{
    event.preventDefault()
if(document.getElementsByName("terms")[0].checked){
  toast.success("Deal!");
}
else {
  toast.warn("First accept terms and conditions")
}

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
            <input checked className="m-2 cursor-pointer" type="radio" name="payMethod" value="Credit Card" onChange={handleChange} />
            Credit Card
            </label>
            <label className="font-poppins text-sm flex m-1 mb-0 justify-start items-center">
            <input className="m-2 cursor-pointer" type="radio" name="payMethod" value="Wire Transfer" onChange={handleChange} />
            Wire Transfer
            </label>
          </div>
          <div className="flex items-center h-24">
            <img className="relative h-full m-1" src={mercadoPagoImg} alt="Mercado Pago Image" />
          </div>
          <div className="flex justify-end">
          <span className="font-poppins text-sm">Total to pay: <span className="font-poppins text-sm font-bold"> $ {bookingData.totalAmount}</span></span>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start p-2 m-2">
            <label className="font-poppins text-sm flex m-1 mb-0 justify-start items-center" htmlFor="">          
            <input className="m-2 cursor-pointer" type="checkbox" name="terms" onChange={handleChange} />
            I agree with terms conditions and privacy policy.
            </label>
            <label className="font-poppins text-sm flex m-1 mb-0 justify-start items-center" htmlFor="">          
            <input className="m-2 cursor-pointer" type="checkbox" name="info" onChange={handleChange} />
            I want to receive the latest information.
            </label>
        </div>
        <div className="flex justify-end">
           <button className="font-poppins bg-blue cursor-pointer rounded-lg p-2 m-2 text-white" onClick={handleSubmit}>Reserve Deal</button>
        </div>
      </form>
      </div>
      <div className="w-1/4 m-8 flex flex-col p-8 h-full sticky drop-shadow-md border bg-white rounded-3xl  dark:bg-slate-900">
        <div className="flex justify-center w">
        <img className="w-full" src={bookingData.image} alt="Car Image" />
        </div>
        <div className="font-poppins text-sm border rounded-lg p-1 my-2">
        <label>Pick up date: <input type="date" name="startDate" value={bookingData.startDate} onChange={handleChange} /></label>
        </div>
        <div className="font-poppins text-sm border rounded-lg p-1 my-2">
        <label>Drop off date: <input type="date" name="endDate" value={bookingData.endDate} onChange={handleChange} /></label>
        </div>
        <div className="flex flex-col border rounded-lg p-1 my-2">
        <div className="flex justify-between font-poppins text-sm p-1 my-2">
        <span className="">Price per day: </span><span>$ {bookingData.price}</span>
        </div>
        <div className="flex justify-between font-poppins text-sm p-1 my-2">
        <span className="">Total days: </span><span>{days=(new Date(bookingData.endDate)-new Date(bookingData.startDate))/(1000*60*60*24)}</span>
        </div>
        <hr />
        <div className="flex justify-between font-poppins text-sm p-1 my-2">
        <span className="">Total amount: </span><span>$ {bookingData.totalAmount}</span>
        </div>
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
