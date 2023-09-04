import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

export default function Detail({ saveState }) {
  const [vehicle, setVehicle] = useState({
    id: '',
    brand: '',
    model: '',
    transmission: '',
    fuel: '',
    passengers: '',
    price: '',
    image: '',
  });

  const { id } = useParams();

  function getVehicleById(id) {
    axios.get(`http://localhost:3001/vehicles/${id}`).then((vehicle) => {
      setVehicle({
        id: vehicle.data.id,
        brand: vehicle.data.brand,
        model: vehicle.data.model,
        transmission: vehicle.data.transmission,
        fuel: vehicle.data.fuel,
        passengers: vehicle.data.passengers,
        price: vehicle.data.pricePerDay,
        image: vehicle.data.image,
      });
    });
  }

  useEffect(() => {
    getVehicleById(id);
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {(!vehicle.model && <Loader />) || (
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-screen-lg mx-auto bg-white p-4 rounded shadow-lg">
            <Link
              to="/cars"
              className="text-blue-500 hover:text-blue-700 mb-4"
              onClick={() => {
                saveState();
              }}
            >
              Back
            </Link>
            <div className="flex">
              <div className="w-1/2">
                <img src={vehicle.image} alt={vehicle.model} className="w-full h-auto" />
              </div>
              <div className="w-1/2 p-4">
                <h2 className="text-4xl font-semibold mb-2">
                  {vehicle.brand} {vehicle.model}
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  {vehicle.transmission} | {vehicle.fuel} | {vehicle.passengers} Passengers
                </p>
                <p className="text-2xl font-semibold mb-4">
                  Price per Day: ${vehicle.price}
                </p>
                <div className="mb-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => {
                      console.log("Reserve button clicked");
                    }}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
