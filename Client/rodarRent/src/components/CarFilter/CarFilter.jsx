import React, { useState, useEffect } from 'react';

const CarFilter = ({ carData, onFilter }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedPassengers, setSelectedPassengers] = useState(new Set());
  const [priceRange, setPriceRange] = useState([130, 300]);
  const [previousState, setPreviousState] = useState(null);

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
      passengers: Array.from(selectedPassengers),
      priceRange: priceRange,
    };
    onFilter(filterOptions);
  };

  const resetFilters = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedTransmissions([]);
    setSelectedFuelTypes([]);
    setSelectedPassengers(new Set());
    setPriceRange([130, 300]);
  };

  const saveState = () => {
    setPreviousState({
      selectedBrand,
      selectedModel,
      selectedTransmissions,
      selectedFuelTypes,
      selectedPassengers,
      priceRange,
    });
  };

  const restorePreviousState = () => {
    if (previousState) {
      setSelectedBrand(previousState.selectedBrand);
      setSelectedModel(previousState.selectedModel);
      setSelectedTransmissions(previousState.selectedTransmissions);
      setSelectedFuelTypes(previousState.selectedFuelTypes);
      setSelectedPassengers(previousState.selectedPassengers);
      setPriceRange(previousState.priceRange);
    }
  };

  useEffect(() => {
    handleApplyFilter();
  }, [selectedBrand, selectedModel, selectedTransmissions, selectedFuelTypes, selectedPassengers, priceRange]);

  return (
    <div className='dark:bg-slate-900 dark:text-gray-100' style={{ padding: '1rem', borderRight: '1px solid #e2e8f0' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-md font-semibold mb-2">Transmissions</h3>
        <hr />
        <div className='flex flex-col justify-center mt-2' >
          {uniqueTransmissions.map((transmission) => (
            <label className='text-lg' key={transmission}>
              <input
                className='mr-2 peer  h-5 w-5 rounded-sm drop-shadow-md bg-white checked:bg-blue checked:border-none'
                type="checkbox"
                value={transmission}
                checked={selectedTransmissions.includes(transmission)}
                onChange={() => {
                  const updatedSelectedTransmissions = [...selectedTransmissions];
                  if (selectedTransmissions.includes(transmission)) {
                    updatedSelectedTransmissions.splice(updatedSelectedTransmissions.indexOf(transmission), 1);
                  } else {
                    updatedSelectedTransmissions.push(transmission);
                  }
                  setSelectedTransmissions(updatedSelectedTransmissions);
                  saveState();
                }}
              />
              {transmission}
            </label>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-md font-semibold mb-2">Fuel Types</h3>
        <hr />
        <div className='flex flex-col justify-center mt-2' >
          {uniqueFuelTypes.map((fuelType) => (
            <label className='text-lg' key={fuelType}>
              <input
                type="checkbox"
                className='mr-2 peer h-5 w-5 rounded-sm drop-shadow-md bg-white checked:bg-blue checked:border-none'
                value={fuelType}
                checked={selectedFuelTypes.includes(fuelType)}
                onChange={() => {
                  const updatedSelectedFuelTypes = [...selectedFuelTypes];
                  if (selectedFuelTypes.includes(fuelType)) {
                    updatedSelectedFuelTypes.splice(updatedSelectedFuelTypes.indexOf(fuelType), 1);
                  } else {
                    updatedSelectedFuelTypes.push(fuelType);
                  }
                  setSelectedFuelTypes(updatedSelectedFuelTypes);
                  saveState();
                }}
              />
              {fuelType}
            </label>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-md font-semibold mb-2">Passengers</h3>
        <hr />
        <div className='flex mt-2' >
          {uniquePassengers.map((passengerCount) => (
            <label key={passengerCount}>
              <input
                type="checkbox"
                value={passengerCount}
                className='mr-2'
                checked={selectedPassengers.has(passengerCount)}
                onChange={() => {
                  const updatedSelectedPassengers = new Set(selectedPassengers);
                  if (selectedPassengers.has(passengerCount)) {
                    updatedSelectedPassengers.delete(passengerCount);
                  } else {
                    updatedSelectedPassengers.add(passengerCount);
                  }
                  setSelectedPassengers(updatedSelectedPassengers);
                  saveState();
                }}
              />
              {passengerCount}
            </label>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-md font-semibold mb-2">Brand</h3>
        <hr />
        <select
          className="border mt-3 rounded p-2 w-full dark:bg-slate-950"
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
          className="border rounded p-2 w-full dark:bg-slate-950"
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
        <hr />
        <input
          className='mt-3'
          type="range"
          min={130}
          max={300}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
        />
        <span>${priceRange[0]} - ${priceRange[1]}</span>
      </div>
      <div>
        <button
          onClick={() => {
            resetFilters();
            restorePreviousState();
          }}
          className="bg-blue text-white font-semibold py-2 px-4 rounded"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default CarFilter;

