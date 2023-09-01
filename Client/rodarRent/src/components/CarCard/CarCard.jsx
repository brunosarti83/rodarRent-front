import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  return (
    <div className="border p-4">
      <Link to={`/detail/${car.id}`}>
        <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="mb-2" />
        <h2 className="text-lg font-semibold">{`${car.brand} ${car.model}`}</h2>
        <p className="text-sm">Transmission: {car.transmission}</p>
        <p className="text-sm">Fuel Type: {car.fuelType}</p>
        <p className="text-sm">Capacity: {car.capacity}</p>
        <p className="text-sm">Price per Day: {car.pricePerDay}</p>
      </Link>
      <button className="mt-2 inline-block text-blue-500 hover:underline">
        <Link to="/reserve">Reserve Deal</Link>
      </button>
    </div>
  );
};

export default CarCard;
