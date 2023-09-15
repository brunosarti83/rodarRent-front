import { useState } from "react";
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
    fuel: filterObject.fuel || "",
    passengers: Number(filterObject.passengers) || "",
    pricePerDayMax: filterObject.pricePerDayMax || 300,
    offset: 0
  });

  const resetFilters = () => {
    dispatch(
      setFilters({
        ...filterObject,
        brand: "",
        model: "",
        transmission: "",
        fuelTypes: "",
        passengers: "",
        pricePerDayMax: 300,
        offset: 0,
      })
    );
  };

  const onChangeFilter = (e) => {
    const filter = e.target.name;
    const value = filterObject[filter] !== e.target.value ? e.target.value : "";
    setLocalFilters({ ...localFilters, [filter]: value, offset: 0 });
    dispatch(setFilters({ ...filterObject, [filter]: value, offset: 0 }));
  };

  return (
    <div
      className="transition duration-300 dark:bg-slate-900 dark:text-gray-100"
      style={{ padding: "0.5rem", borderRight: "1px solid #e2e8f0" }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <h3 className="text-md font-semibold mb-2">Transmissions</h3>
        <hr className="border-gray-300" />
        <div className="flex flex-col justify-center mt-2">
          {availableFilterOptions.transmissions.map((transmission) => (
            <label className="text-lg" key={transmission}>
              <input
                className='mr-2 peer relative appearance-none h-4 w-4 rounded-sm drop-shadow-md border border-gray-300 bg-white checked:bg-blue checked:border-none after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==")] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content'
                type="checkbox"
                name="transmission"
                value={transmission}
                checked={localFilters.transmission === transmission}
                onChange={onChangeFilter}
              />
              {transmission}
            </label>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <h3 className="text-md font-semibold mb-2">Fuel Types</h3>
        <hr className="border-gray-300" />
        <div className="flex flex-col justify-center mt-2">
          {availableFilterOptions.fuelTypes.map((fuel) => (
            <label className="text-lg" key={fuel}>
              <input
                type="checkbox"
                className='mr-2 peer relative appearance-none h-4 w-4 rounded-sm drop-shadow-md border border-gray-300 bg-white checked:bg-blue checked:border-none after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==")] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content'
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
        <hr className="border-gray-300" />
        <div className="flex mt-2">
          {availableFilterOptions.passengers.map((passengers, index) => (
            <div className={` ${index > 0 ? " ml-4" : ""}`} key={passengers}>
              <input
                type="checkbox"
                name="passengers"
                value={passengers}
                className='mr-1 relative appearance-none h-4 w-4 rounded-sm drop-shadow-md border border-gray-300 bg-white checked:bg-blue checked:border-none after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==")] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content'
                checked={localFilters.passengers === passengers}
                onChange={onChangeFilter}
              />
              {passengers}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <h3 className="text-md font-semibold mb-2">Brand</h3>
        <hr className="border-gray-300" />
        <select
          className="border mt-3 rounded p-2 w-full dark:bg-slate-950"
          name="brand"
          value={filterObject.brand}
          onChange={onChangeFilter}
        >
          <option value="">Select a brand</option>
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
          <option value="">Select a model</option>
          {availableFilterOptions.models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <h3 className="text-md font-semibold mb-2">Price Per Day</h3>
        <hr className="border-gray-300" />
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
