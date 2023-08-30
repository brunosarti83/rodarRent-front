import React, { useState } from 'react';
import CarCard from '../Car/Car';
import CarFilter from '../CarFilter/CarFilter';
import carData from '../../data';
import Pagination from '../Pagination/Pagination';

const CarList = () => {
  const [filteredCars, setFilteredCars] = useState(carData);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

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
    setCurrentPage(1);
  };
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const carsToShow = filteredCars.slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex">
        <div className="w-1/4 p-4">
          <h1 className="text-xl font-bold mb-4">Filter By</h1>
          <CarFilter carData={carData} onFilter={handleFilter} />
        </div>
        <div className="w-3/4 p-4 grid grid-cols-3 gap-4">
        {carsToShow.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      </div>
      <div className="w-full px-4">
        <Pagination 
        carList={filteredCars} 
        carsPerPage={carsPerPage}
         onPageChange={onPageChange}
          />
      </div>
    </div>
  );
};

export default CarList;