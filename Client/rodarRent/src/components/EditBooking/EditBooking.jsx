import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  updateBookingUrl,
  getBookingById,
  getAllVehicles,
  getAllLocations,
} from "../../helpers/routes";
import Loader from '../Loader/Loader'; // Importa el componente Loader

function EditBooking({ bookingId }) {
  const [bookingData, setBookingData] = useState({
    stateBooking: "",
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para mostrar la carga

  useEffect(() => {
    axios.get(getBookingById(bookingId)).then((response) => {
      console.log("Booking Data:", response.data);
      const existingBookingData = response.data;
      setBookingData(existingBookingData);
      setShowConfirmationModal(true); // Mostrar el modal de confirmación al cargar los datos
      setIsLoading(false); // Ocultar la carga cuando los datos se cargan
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

  const handleConfirmCancelBooking = async () => {
    try {
      const updatedBookingData = {
        ...bookingData,
        stateBooking: "canceled",
      };

      const response = await axios.put(
        updateBookingUrl(bookingId),
        updatedBookingData
      );

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }

    setShowConfirmationModal(false);
  };

  const handleCancelConfirmModal = () => {
    setShowConfirmationModal(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 duration-300 dark:text-gray-100 flex items-center justify-center">
      {/* Modal de confirmación */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="bg-white p-4 rounded-lg z-50">
            <p className="text-lg font-semibold mb-2">Confirm Cancellation</p>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="flex justify-end mt-4">
              <button
                className="font-poppins bg-red cursor-pointer rounded-lg p-1 m-2 text-white"
                onClick={handleConfirmCancelBooking}
              >
                Yes, Cancel
              </button>
              <button
                className="font-poppins bg-blue cursor-pointer rounded-lg p-1 m-2 text-white"
                onClick={handleCancelConfirmModal}
              >
                No, Keep
              </button>
            </div>
          </div>
        </div>
      ) || <Loader/>}
    </div>
  );
}

export default EditBooking;
