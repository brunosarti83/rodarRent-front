import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  updateBookingUrl,
  getBookingById,
  getAllVehicles,
  getAllLocations,
} from "../../helpers/routes"; // Asegúrate de importar las rutas correctas

function EditBooking({ bookingId }) {
  const [bookingData, setBookingData] = useState({
    VehicleId: "",
    startDate: "",
    finishDate: "",
    pickUpLocationId: "",
    returnLocationId: "",
  });

  const [allVehicles, setAllVehicles] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET para obtener los detalles de la reserva existente por su ID (bookingId) y actualiza el estado con los datos existentes.
    axios.get(getBookingById(bookingId)).then((response) => {
      console.log("Booking Data:", response.data); // Muestra los datos de la reserva en la consola
      const existingBookingData = response.data;
      setBookingData(existingBookingData);
    });

    // Obtén la lista de todos los vehículos
    axios.get(getAllVehicles()).then((response) => {
      console.log("Vehicles Data:", response.data); // Muestra los datos de vehículos en la consola

      // Extrae la matriz de vehículos de la respuesta
      const vehiclesArray = response.data.results;

      // Establece la lista de vehículos en el estado
      setAllVehicles(vehiclesArray);
    });

    // Obtén la lista de todas las localizaciones
    axios.get(getAllLocations()).then((response) => {
      console.log("Locations Data:", response.data); // Muestra los datos de localizaciones en la consola
      setAllLocations(response.data); // Asegúrate de utilizar la estructura de datos correcta en la respuesta
    });
  }, [bookingId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      // Realiza una solicitud PUT para actualizar la reserva.
      const response = await axios.put(
        updateBookingUrl(bookingId),
        bookingData
      );

      if (response.status === 200) {
        // Realiza alguna acción después de una actualización exitosa
      } else {
        // Maneja errores aquí si la solicitud no fue exitosa.
      }
    } catch (error) {
      console.error("Error fetching booking data:", error); // Muestra los errores en la consola
      // Maneja errores de solicitud aquí.
    }
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
        <div className="flex">
          <div className="w-2/4">
            <h2>Edit Booking</h2>
            <form onSubmit={handleUpdate}>
              <div>
                <label>Vehicle</label>
                <select
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


              <div>
                <label>Pick Up Location</label>
                <select
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
              <div>
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={bookingData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Finish Date</label>
                <input
                  type="date"
                  name="finishDate"
                  value={bookingData.finishDate}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBooking;
