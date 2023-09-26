import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiMessageAltCheck, BiMessageAltX } from 'react-icons/bi';
import { cancelBookingUrl, getBookingById } from '../../helpers/routes';
import Loader from '../Loader/Loader';

function EditBooking({ bookingId, allVehicles, onClose }) {
  const [bookingData, setBookingData] = useState({
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(getBookingById(bookingId)).then((response) => {
      console.log('Booking Data:', response.data);
      const existingBookingData = response.data;
      setBookingData(existingBookingData);
      setShowConfirmationModal(true);
      setIsLoading(false);
    });
  }, [bookingId]);

  const handleConfirmCancelBooking = async () => {
    try {
      const cancelBookingData = {
        ...bookingData,
        stateBooking: 'canceled',
      };
  
      const response = await axios.put(cancelBookingUrl(bookingId), cancelBookingData);
  
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  
    setShowConfirmationModal(false);
  };

  const handleCancelConfirmModal = () => {
    setShowConfirmationModal(false);
    onClose(); 
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 duration-300 dark:text-gray-100 flex items-center justify-center">
   
      {showConfirmationModal && (
        <div className="w-full h-full bg-white flex flex-col items-center justify-center font-poppins">
          <h3 className="text-2xl font-bold">
            Are you sure you want to delete this booking?
          </h3>
          <h2 className="pt-5 text-lg">
             {allVehicles.map((vehicle) => {
              if (vehicle.id === bookingData.VehicleId) {
                return (
                  <div key={vehicle.id}>
                    <span className="font-semibold">{vehicle.brand} {vehicle.model}</span>
                  </div>
                );
              }
              return null;
            })}
          </h2>
          <div className="flex justify-evenly w-full pt-5">
            <button
              onClick={handleConfirmCancelBooking}
              className="w-1/5 py-1 flex justify-evenly items-center text-lg rounded-md border border-gray-300 bg-white drop-shadow-lg hover:drop-shadow-none hover:bg-green-700 hover:text-white transition-all duration-300"
            >
              Yes <BiMessageAltCheck />
            </button>
            <button
              onClick={handleCancelConfirmModal}
              className="w-1/5 py-1 flex items-center justify-evenly text-lg rounded-md border border-gray-300 bg-white drop-shadow-lg hover:drop-shadow-none hover:bg-red hover:text-white transition-all duration-300"
            >
              No <BiMessageAltX />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditBooking;
