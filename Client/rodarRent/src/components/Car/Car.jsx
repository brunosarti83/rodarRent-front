import React from 'react';

const CarCard = ({ car }) => {
  return (
    <div>
      <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
      <h2>{`${car.brand} ${car.model}`}</h2>
      <p>Transmission: {car.transmission}</p>
      <p>Fuel Type: {car.fuelType}</p>
      <p>Capacity: {car.capacity}</p>
      <p>pricePerDay: {car.pricePerDay}</p>
    </div>
  );
};

export default CarCard;
