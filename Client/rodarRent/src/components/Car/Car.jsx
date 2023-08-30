import React from 'react';


const CarCard = ({ car }) => {
  return (
    <div className="border p-4">
      <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="mb-2" />
      <h2 className="text-lg font-semibold">{`${car.brand} ${car.model}`}</h2>
      <p className="text-sm">Transmission: {car.transmission}</p>
      <p className="text-sm">Fuel Type: {car.fuelType}</p>
      <p className="text-sm">Capacity: {car.capacity}</p>
      <p className="text-sm">Price per Day: {car.pricePerDay}</p>
    </div>
  );
};

export default CarCard;