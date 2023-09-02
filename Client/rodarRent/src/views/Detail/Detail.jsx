import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import carData from '../../data';

function Detail() {
  const { id } = useParams();
  const car = carData.find(car => car.id === id);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navegar hacia atrás en la pila de navegación
  };

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="border p-4">
      <button onClick={handleGoBack} className="text-blue-500 mb-2 block">
        &#8592; Back
      </button>
      <img src={car.image} alt={`${car.brand} ${car.model}`} className="mb-2" />
      <h2 className="text-lg font-semibold">{`${car.brand} ${car.model}`}</h2>
      <p className="text-sm">Transmission: {car.transmission}</p>
      <p className="text-sm">Fuel Type: {car.fuel}</p>
      <p className="text-sm">Capacity: {car.passengers}</p>
      <p className="text-sm">Price per Day: {car.pricePerDay}</p>
      
      {/* Agrega características adicionales aquí si es necesario */}
      {car.year && <p className="text-sm">Year: {car.year}</p>}
      {car.type && <p className="text-sm">Type: {car.type}</p>}
      {car.passengers && <p className="text-sm">Passengers: {car.passengers}</p>}
      {car.availability && <p className="text-sm">Availability: Available</p>}
    </div>
  );
}

export default Detail;