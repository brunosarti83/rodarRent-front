import React, { useState, useEffect } from 'react';

const CarFilter = ({ carData, onFilter }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedPassengers, setSelectedPassengers] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);

  const uniqueBrands = Array.from(new Set(carData.map(car => car.brand)));
  const uniqueModels = Array.from(new Set(carData.map(car => car.model)));
  const uniqueTransmissions = Array.from(new Set(carData.map(car => car.transmission)));
  const uniqueFuelTypes = Array.from(new Set(carData.map(car => car.fuel)));
  const uniquePassengers = Array.from(new Set(carData.map(car => car.passengers)));

  const handleApplyFilter = () => {
    const filterOptions = {
      brand: selectedBrand,
      model: selectedModel,
      transmissions: selectedTransmissions,
      fuelTypes: selectedFuelTypes,
      passengers: selectedPassengers,
      priceRange: priceRange,
    };
    onFilter(filterOptions);
  };

  const resetFilters = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedTransmissions([]);
    setSelectedFuelTypes([]);
    setSelectedPassengers([]);
    setPriceRange([0, 300]);
  };

  useEffect(() => {
    handleApplyFilter();
  }, [selectedBrand,
    selectedModel,
    selectedTransmissions,
    selectedFuelTypes,
    selectedPassengers,
    priceRange]);

  return (
    <div style={{ padding: '1rem', borderRight: '1px solid #e2e8f0' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h2 className="text-lg font-semibold mb-2">Filter By</h2>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-md font-semibold mb-2">Transmissions</h3>
        {uniqueTransmissions.map((transmission) => (
          <label key={transmission}>
            <input
              type="checkbox"
              value={transmission}
              checked={selectedTransmissions.includes(transmission)}
              onChange={() => {
                if (selectedTransmissions.includes(transmission)) {
                  setSelectedTransmissions(selectedTransmissions.filter((type) => type !== transmission));
                } else {
                  setSelectedTransmissions([...selectedTransmissions, transmission]);
                }
              }}
            />
            {transmission}
          </label>
        ))}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-md font-semibold mb-2">Fuel Types</h3>
        {uniqueFuelTypes.map((fuelType) => (
          <label key={fuelType}>
            <input
              type="checkbox"
              value={fuelType}
              checked={selectedFuelTypes.includes(fuelType)}
              onChange={() => {
                if (selectedFuelTypes.includes(fuelType)) {
                  setSelectedFuelTypes(selectedFuelTypes.filter((type) => type !== fuelType));
                } else {
                  setSelectedFuelTypes([...selectedFuelTypes, fuelType]);
                }
              }}
            />
            {fuelType}
          </label>
        ))}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-md font-semibold mb-2">Passengers</h3>
        {uniquePassengers.map((passengerCount) => (
          <label key={passengerCount}>
            <input
              type="checkbox"
              value={passengerCount}
              checked={selectedPassengers.includes(passengerCount)}
              onChange={() => {
                if (selectedPassengers.includes(passengerCount)) {
                  setSelectedPassengers(selectedPassengers.filter((count) => count !== passengerCount));
                } else {
                  setSelectedPassengers([...selectedPassengers, passengerCount]);
                }
              }}
            />
            {passengerCount}
          </label>
        ))}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-md font-semibold mb-2">Brand</h3>
        <select
          className="border rounded p-2 w-full"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-md font-semibold mb-2">Model</h3>
        <select
          className="border rounded p-2 w-full"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="">All Models</option>
          {uniqueModels.map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-md font-semibold mb-2">Price Per Day</h3>
        <input
          type="range"
          min={0}
          max={300}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
        />
        <span>${priceRange[0]} - ${priceRange[1]}</span>
      </div>
      <div>
        <button
          onClick={resetFilters}
          className="bg-gray-300 hover:bg-gray-400 font-semibold py-2 px-4 rounded"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default CarFilter;
