import { useState, useEffect } from 'react';

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
                className='mr-2 peer relative appearance-none h-5 w-5 rounded-md drop-shadow-md border border-gray-300 bg-white checked:bg-blue checked:border-none after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==")] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content'
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
                className='mr-2 peer relative appearance-none h-5 w-5 rounded-md drop-shadow-md border border-gray-300 bg-white checked:bg-blue checked:border-none after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==")] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content'
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
        <hr className="border-gray-300" />
        <div className='flex mt-2' >
          {uniquePassengers.map((passengerCount) => (
            <label key={passengerCount}>
              <input
                type="checkbox"
                value={passengerCount}
                className='mr-2 peer relative appearance-none h-5 w-5 rounded-md drop-shadow-md border border-gray-300 bg-white checked:bg-blue checked:border-none after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==")] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content'
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
          className="border border-gray-200 bg-white drop-shadow-md mt-3 rounded p-2 w-full dark:bg-slate-950"
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
          className="border border-gray-200 bg-white drop-shadow-md rounded p-2 w-full dark:bg-slate-950"
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

