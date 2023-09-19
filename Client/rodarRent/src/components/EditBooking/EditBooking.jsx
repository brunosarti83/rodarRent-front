import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  updateBookingUrl,
  getBookingById,
  getAllVehicles,
  getAllLocations,
} from "../../helpers/routes";

function EditBooking({ bookingId }) {
  const [bookingData, setBookingData] = useState({
    VehicleId: "",
    startDate: "",
    finishDate: "",
    pickUpLocationId: "",
    returnLocationId: "",
    stateBooking: "confirmed"
  });

  const [allVehicles, setAllVehicles] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {

    axios.get(getBookingById(bookingId)).then((response) => {
      console.log("Booking Data:", response.data);
      const existingBookingData = response.data;
      setBookingData(existingBookingData);
    });


    axios.get(getAllVehicles()).then((response) => {
      console.log("Vehicles Data:", response.data);


      const vehiclesArray = response.data.results;


      setAllVehicles(vehiclesArray);
    });


    axios.get(getAllLocations()).then((response) => {
      console.log("Locations Data:", response.data);
      setAllLocations(response.data);
    });
  }, [bookingId]);

  const handleUpdate = async (event) => {
    event.preventDefault();
  
    try {
    
      const updatedBookingData = {
        ...bookingData,
        startDate: addOneDay(bookingData.startDate),
        finishDate: addOneDay(bookingData.finishDate),
      };
  
      const response = await axios.put(
        updateBookingUrl(bookingId),
        updatedBookingData
      );
  
      if (response.status === 200) {
      
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
    }
  };
  
  const addOneDay = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };
  

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 duration-300 dark:text-gray-100 flex items-center justify-center">
      <div className="w-120 drop-shadow-md border bg-white rounded-3xl dark:bg-slate-900">
        <form onSubmit={handleUpdate} className="w-120 px-16 py-5 flex flex-col rounded-xl justify-center">
          <h1 className="font-poppins p-2 text-3xl">Edit Booking</h1>
          <hr className="ml-8 mr-8 p-2 text-gray" />

          <div className="mb-4">
            <label className="font-poppins text-sm flex m-1 mb-0 justify-start" htmlFor="VehicleId">
              Vehicle
            </label>
            <select
              className="w-full font-poppins text-sm text-black flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
              name="VehicleId"
              value={bookingData.VehicleId}
              onChange={handleChange}
            >
              <option value="">Select a Vehicle</option>
              {allVehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.brand} - {vehicle.model}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex">
            <div className="w-1/2 pr-2">
              <label className="font-poppins text-sm flex m-1 mb-0 justify-start" htmlFor="pickUpLocationId">
                Pick Up Location
              </label>
              <div className="flex items-center">
                <select
                  className="w-full font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  name="pickUpLocationId"
                  value={bookingData.pickUpLocationId}
                  onChange={handleChange}
                >
                  <option value="">Select a Location</option>
                  {allLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.alias}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-1/2 pl-2">
              <label className="font-poppins text-sm flex m-1 mb-0 justify-start" htmlFor="returnLocationId">
                Return Location
              </label>
              <div className="flex items-center">
                <select
                  className="w-full font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  name="returnLocationId"
                  value={bookingData.returnLocationId}
                  onChange={handleChange}
                >
                  <option value="">Select a Location</option>
                  {allLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.alias}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mb-4 flex">
            <div className="w-1/2 pr-2">
              <label className="font-poppins text-sm flex m-1 mb-0 justify-start" htmlFor="startDate">
                Start Date
              </label>
              <div className="flex items-center">
                <input
                  className="w-full font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="date"
                  name="startDate"
                  value={bookingData.startDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <label className="font-poppins text-sm flex m-1 mb-0 justify-start" htmlFor="finishDate">
                Finish Date
              </label>
              <div className="flex items-center">
                <input
                  className="w-full font-poppins text-black text-sm flex justify-start items-center p-1 m-1 rounded-lg drop-shadow-md border border-gray"
                  type="date"
                  name="finishDate"
                  value={bookingData.finishDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-4 mb-4">
            <button
              className="font-poppins bg-blue cursor-pointer rounded-lg p-1 m-2 text-white"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooking;
