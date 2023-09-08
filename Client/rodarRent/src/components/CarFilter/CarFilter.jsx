import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/actions";

const CarFilter = () => {
  
  const dispatch = useDispatch();
  const filterObject = useSelector((state) => state.veh.filterObject);
  const availableFilterOptions = useSelector(
    (state) => state.veh.vehicles.availableFilterOptions
  );
  const [localFilters, setLocalFilters] = useState({
    ...filterObject,
    brand: filterObject.brand || "",
    model: filterObject.model || "",
    transmission: filterObject.transmission || "",
    fuel: filterObject.fuel || '',
    passengers: Number(filterObject.passengers) || "",
    pricePerDayMax: filterObject.pricePerDayMax || 300,
  });

  const resetFilters = () => {
    dispatch(
      setFilters({
        ...filterObject,
        brand: "",
        model: "",
        transmissions: '',
        fuelTypes: '',
        passengers: "",
        pricePerDayMax: 300,
      })
    );
  };

  const onChangeFilter = (e) => {
    const filter = e.target.name;
    const value = (filterObject[filter] !== e.target.value) ? e.target.value : '';
    setLocalFilters({...localFilters, [filter]: value})
    dispatch(setFilters({...filterObject, [filter]: value}))
  } 

  return (
    <div
      className="dark:bg-slate-900 dark:text-gray-100"
      style={{ padding: "1rem", borderRight: "1px solid #e2e8f0" }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <h3 className="text-md font-semibold mb-2">Transmissions</h3>
        <hr />
        <div className="flex flex-col justify-center mt-2">
          {availableFilterOptions.transmissions.map((transmission) => (
            <label className="text-lg" key={transmission}>
              <input
                className="mr-2 peer  h-5 w-5 rounded-sm drop-shadow-md bg-white checked:bg-blue checked:border-none"
                type="checkbox"
                name="transmission"
                value={transmission}
                checked={localFilters.transmission === transmission}
                onChange= {onChangeFilter}
              />
              {transmission}
            </label>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <h3 className="text-md font-semibold mb-2">Fuel Types</h3>
        <hr />
        <div className="flex flex-col justify-center mt-2">
          {availableFilterOptions.fuelTypes.map((fuel) => (
            <label className="text-lg" key={fuel}>
              <input
                type="checkbox"
                className="mr-2 peer h-5 w-5 rounded-sm drop-shadow-md bg-white checked:bg-blue checked:border-none"
                name="fuel"
                value={fuel}
                checked={localFilters.fuel === fuel}
                onChange={onChangeFilter}
              />
              {fuel}
            </label>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <h3 className="text-md font-semibold mb-2">Passengers</h3>
        <hr />
        <div className="flex mt-2">
          {availableFilterOptions.passengers.map((passengers) => (
            <label key={passengers}>
              <input
                type="checkbox"
                name="passengers"
                value={passengers}
                className="mr-2"
                checked={localFilters.passengers === passengers}
                onChange={onChangeFilter}
              />
              {passengers}
            </label>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <h3 className="text-md font-semibold mb-2">Brand</h3>
        <hr />
        <select
          className="border mt-3 rounded p-2 w-full dark:bg-slate-950"
          name="brand"
          value={filterObject.brand}
          onChange={onChangeFilter}
        >
          <option value="">All Brands</option>
          {availableFilterOptions.brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <h3 className="text-md font-semibold mb-2">Model</h3>
        <select
          className="border rounded p-2 w-full dark:bg-slate-950"
          name="model"
          value={filterObject.model}
          onChange={onChangeFilter}
        >
          <option value="">All Models</option>
          {availableFilterOptions.models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <h3 className="text-md font-semibold mb-2">Price Per Day</h3>
        <hr />
        <input
          className="mt-3"
          type="range"
          min={130}
          max={300}
          name="pricePerDayMax"
          value={localFilters.pricePerDayMax}
          onChange={onChangeFilter}
        />
        <span>
          ${130} - ${localFilters.pricePerDayMax}
        </span>
      </div>
      <div>
        <button
          onClick={() => {
            resetFilters();
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
