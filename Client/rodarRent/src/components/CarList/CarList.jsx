import React, { useState } from 'react';
import CarCard from '../CarCard/CarCard';
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
      const fuelTypeFilter = filterOptions.fuelTypes.length === 0 || filterOptions.fuelTypes.includes(car.fuel);
      const capacityFilter = filterOptions.passengers.length === 0 || filterOptions.passengers.includes(car.capacity);
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
    <div className="flex">
      <div className="w-1/4 p-4" style={{ maxWidth: '295px', height: '827px' }}>
        <h1 className="text-xl font-bold mb-4">Filter By</h1>
        <CarFilter carData={carData} onFilter={handleFilter} />
      </div>
      <div className="flex flex-col items-end w-3/4 p-4 ml-auto" style={{ width: '1146px', height: '827px', overflowY: 'auto' }}>
        <div className="grid grid-cols-3 gap-4">
          {carsToShow.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div className="w-full mt-4">
          <Pagination 
            carList={filteredCars} 
            carsPerPage={carsPerPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CarList;
