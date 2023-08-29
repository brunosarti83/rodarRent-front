import React, { useState } from 'react';

const CarFilter = ({ carData, onFilter }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedCapacities, setSelectedCapacities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]); 

  const uniqueBrands = Array.from(new Set(carData.map(car => car.brand)));
  const uniqueModels = Array.from(new Set(carData.map(car => car.model)));
  const uniqueTransmissions = Array.from(new Set(carData.map(car => car.transmission)));
  const uniqueFuelTypes = Array.from(new Set(carData.map(car => car.fuelType)));
  const uniqueCapacities = Array.from(new Set(carData.map(car => car.capacity)));

  const handleApplyFilter = () => {
    const filterOptions = {
      brand: selectedBrand,
      model: selectedModel,
      transmissions: selectedTransmissions,
      fuelTypes: selectedFuelTypes,
      capacities: selectedCapacities,
      priceRange: priceRange,
    };
    onFilter(filterOptions);
  };

  return (
    <div>
      <div>
        <label>Brand:</label>
        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value="">All Brands</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Model:</label>
        <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
          <option value="">All Models</option>
          {uniqueModels.map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Transmissions:</label>
        {uniqueTransmissions.map((transmission) => (
          <label key={transmission}>
            <input
              type="checkbox"
              value={transmission}
              checked={selectedTransmissions.includes(transmission)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedTransmissions([...selectedTransmissions, transmission]);
                } else {
                  setSelectedTransmissions(selectedTransmissions.filter(t => t !== transmission));
                }
              }}
            />
            {transmission}
          </label>
        ))}
      </div>
      <div>
        <label>Fuel Types:</label>
        {uniqueFuelTypes.map((fuelType) => (
          <label key={fuelType}>
            <input
              type="checkbox"
              value={fuelType}
              checked={selectedFuelTypes.includes(fuelType)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedFuelTypes([...selectedFuelTypes, fuelType]);
                } else {
                  setSelectedFuelTypes(selectedFuelTypes.filter(t => t !== fuelType));
                }
              }}
            />
            {fuelType}
          </label>
        ))}
      </div>
      <div>
        <label>Capacities:</label>
        {uniqueCapacities.map((capacity) => (
          <label key={capacity}>
            <input
              type="checkbox"
              value={capacity}
              checked={selectedCapacities.includes(capacity)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCapacities([...selectedCapacities, capacity]);
                } else {
                  setSelectedCapacities(selectedCapacities.filter(c => c !== capacity));
                }
              }}
            />
            {capacity}
          </label>
        ))}
      </div>
      <div>
        <label>Price Per Day:</label>
        <input
          type="range"
          min={0}
          max={300}
          value={priceRange[1]} 
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
        />
        <span>${priceRange[0]} - ${priceRange[1]}</span>
      </div>
      <button onClick={handleApplyFilter}>Apply Filter</button>
    </div>
  );
};

export default CarFilter;
