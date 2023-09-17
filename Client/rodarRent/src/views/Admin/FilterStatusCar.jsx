import React, {useState, useEffect} from "react";
import { useQuery } from "react-query";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export const FilterStatusCar = () =>{

    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [carId, setCarId] = useState();
    const [pickUpDate, setPickUpDate] = useState(dayjs(new Date()));
    const [dropOffDate, setDropOffDate] = useState(dayjs(new Date()));

    const queryVehicles = useQuery(["vehicles"], () =>
    fetch("http://localhost:3001/vehicles").then((res) => res.json())
  );

    function fetchAvailable(carId, pickUpDate, dropOffDate) {
        const startDate = pickUpDate.toISOString().slice(0, 10);
        const endDate = dropOffDate.toISOString().slice(0, 10);
        console.log(startDate, endDate);
        const url = `http://localhost:3001/available/${carId}/${startDate}/${endDate}`;
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
        infoVehicles.forEach(car => {
          if (e.target.value === vehicleString(car)) id = car.id;
        })
        setCarId(id);
      };

      return (
        <div className="border-2 rounded-2xl p-4 ml-8 w-full">
        <div className="superior grid grid-cols-4 gap-4">
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
                {infoVehicles?.map((car) => { return (
                  <MenuItem key={car.id} value={vehicleString(car)}>
                    {vehicleString(car)}
                  </MenuItem>
                )})}
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
  
          <Stack spacing={2} direction="column">
            <Button 
            className="h-14" 
            variant="contained"
            >
              Search
            </Button>
          </Stack>
        </div>
        <div className="inferior mt-4 py-4 text-center text-5xl border-2 rounded-lg">
          Status : {queryAvailable.data?.state}
        </div>
      </div>
      )
}