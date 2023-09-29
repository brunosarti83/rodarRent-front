import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loader from "../../components/Loader/Loader";
import { API_BASE_URL } from "../../helpers/routes";

export const FilterStatusCar = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [carId, setCarId] = useState();
  const [pickUpDate, setPickUpDate] = useState(dayjs(new Date()));
  const [dropOffDate, setDropOffDate] = useState(dayjs(new Date()));

  const queryVehicles = useQuery(["vehicles"], () =>
    fetch(`${API_BASE_URL}/vehicles`).then((res) => res.json())
  );

  function fetchAvailable(carId, pickUpDate, dropOffDate) {
    const startDate = pickUpDate.toISOString().slice(0, 10);
    const endDate = dropOffDate.toISOString().slice(0, 10);
    console.log(startDate, endDate);
    const url = `${API_BASE_URL}/available/${carId}/${startDate}/${endDate}`;
    console.log(url);
    return fetch(url).then((res) => res.json());
  }

  const queryAvailable = useQuery(
    ["available", carId, pickUpDate, dropOffDate],
    () => fetchAvailable(carId, pickUpDate, dropOffDate),
    {
      enabled: !!carId,
    }
  );

  useEffect(() => {
    const newDropOffDate = pickUpDate.add(1, "day");
    setDropOffDate(newDropOffDate);
  }, [pickUpDate]);

  const infoVehicles = queryVehicles.data?.results?.map((e) => ({
    id: e.id,
    brand: e.brand,
    domain: e.domain,
  }));

  function vehicleString(data) {
    return `${data.brand}-${data.domain}`;
  }

  const handleChange = (e) => {
    setSelectedVehicle(e.target.value);
    let id;
    infoVehicles.forEach((car) => {
      if (e.target.value === vehicleString(car)) id = car.id;
    });
    setCarId(id);
  };

  return (
    <div className="p-4 ">
          <div className="text-center text-2xl font-semibold mb-4">Car Status filtering</div>

      <div className="grid grid-cols-3 gap-4">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Vehicles</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedVehicle}
              label="Car number"
              onChange={handleChange}
            >
              {infoVehicles?.map((car) => {
                return (
                  <MenuItem key={car.id} value={vehicleString(car)}>
                    {vehicleString(car)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <DatePicker
          label="Pick Up Date"
          value={pickUpDate}
          onChange={(newValue) => setPickUpDate(newValue)}
          renderInput={(params) => (
            <input
              readOnly
              className="MuiInputBase-input MuiOutlinedInput-input"
              {...params.inputProps}
              value={dayjs(params.inputProps.value).format("YYYY-MM-DD")}
            />
          )}
        />

        <DatePicker
          label="Drop Off Date"
          value={dropOffDate}
          onChange={(newValue) => setDropOffDate(newValue)}
          renderInput={(params) => (
            <input
              readOnly
              className="MuiInputBase-input MuiOutlinedInput-input"
              {...params.inputProps}
              value={dayjs(params.inputProps.value).format(
                "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
              )}
            />
          )}
        />

      </div>

      <div
        className={`mt-4 place-content-center py-4  text-5xl flex space-x-4 rounded-lg ${
          queryAvailable.isFetching
            ? "border-2 border-gray-300"
            : queryAvailable.data?.state === "Available"
            ? "border-4 border-green-600"
            : queryAvailable.data?.state === "Not Available - Rented"
            ? "border-4 border-red"
            : ""
        }`}
      >
        Status : {queryAvailable.data?.state || "Select car..."}
      </div>
    </div>
  );
};
