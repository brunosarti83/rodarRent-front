import React, { useState } from 'react';
import CarCard from '../Car/Car';
import CarFilter from '../CarFilter/CarFilter';
import carData from '../../data';

const CarList = () => {
  const [filteredCars, setFilteredCars] = useState(carData);

  const handleFilter = (filterOptions) => {
    const filteredResults = carData.filter(car => {
      const brandFilter = !filterOptions.brand || car.brand === filterOptions.brand;
      const modelFilter = !filterOptions.model || car.model === filterOptions.model;
      const transmissionFilter = filterOptions.transmissions.length === 0 || filterOptions.transmissions.includes(car.transmission);
      const fuelTypeFilter = filterOptions.fuelTypes.length === 0 || filterOptions.fuelTypes.includes(car.fuelType);
      const capacityFilter = filterOptions.capacities.length === 0 || filterOptions.capacities.includes(car.capacity);
      const priceFilter = car.pricePerDay >= filterOptions.priceRange[0] && car.pricePerDay <= filterOptions.priceRange[1];

      return brandFilter && modelFilter && transmissionFilter && fuelTypeFilter && capacityFilter && priceFilter;
    });

    setFilteredCars(filteredResults);
  };

  return (
    <div>
      <><h1>Filter By</h1></>
      <CarFilter carData={carData} onFilter={handleFilter} />
      <div>
        {filteredCars.map((car) => (
          <CarCard key={car.id} car={{
            id: car.id,
            brand: car.brand,
            model: car.model,
            transmission: car.transmission,
            fuelType: car.fuelType,
            capacity: car.capacity,
            imageUrl: car.imageUrl,
            pricePerDay: car.pricePerDay
          }}
          />
        ))}
      </div>
    </div>
  );
};

export default CarList;
