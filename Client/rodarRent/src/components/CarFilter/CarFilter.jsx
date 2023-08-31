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
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-md font-semibold mb-2">Fuel Types</h3>
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
      <div style={{ marginBottom: '1rem' }}>
        <h3 className="text-md font-semibold mb-2">Capacities</h3>
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
        {/* ... (model filter JSX) */}
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
          onClick={handleApplyFilter}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default CarFilter;
