import{ useEffect, useState } from "react";
import * as echarts from "echarts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TableDashboard from "./TableDashboard";
import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
  const [carId, setCarId] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [pickUpDate, setPickUpDate] = useState(dayjs(new Date()));
  const [dropOffDate, setDropOffDate] = useState(dayjs(new Date()));

  function fetchBookings() {
    return fetch("http://localhost:3001/booking/filter?limit=100").then((res) =>
      res.json()
    );
  }

  const queryBookings = useQuery(["bookings"], fetchBookings);

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
    const chartContainer = document.getElementById("hireCancel");
    const hireCancel = echarts.init(chartContainer);

    const options = {
      grid: {},
      title: {
        text: "Hired vs Cancel",
        textStyle: {
          fontSize: 24,
          fontWeight: "bold",
        },
        left: "center",
        top: "5%",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "0%",
        bottom: "0%",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: true,
          height: "420px",
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "Hired", itemStyle: { color: "green" } },
            { value: 735, name: "Cancel", itemStyle: { color: "red" } },
            { value: 580, name: "Pending", itemStyle: { color: "yellow" } },
          ],
        },
      ],
    };

    hireCancel.setOption(options);
    return () => {
      hireCancel.dispose();
    };
  });

  useEffect(() => {
    const newDropOffDate = pickUpDate.add(1, "day");
    setDropOffDate(newDropOffDate);
  }, [pickUpDate]);

  const incomeToday = queryBookings.data
    ?.map((e) => e.amount)
    .reduce((a, b) => a + b);

  const tarjeta = (
    <div className="col-span-1 md:col-span-1 mb-8">
      <div className="flex-col w-auto rounded-2xl border-2 drop-shadow-md">
        <div className="flex w-full justify-around pt-6">
          <div className="font-semibold text-lg">INCOME</div>
          <div className="font-semibold text-lg">TODAY</div>
        </div>
        <div className="text-center mt-10">
          {!incomeToday ? (
            <Loader />
          ) : (
            <div className="text-5xl">${incomeToday}</div>
          )}
          <hr className="border-t-2 border-gray-300 w-3/4 mx-auto my-6" />
        </div>
      </div>
    </div>
  );

  const infoVehicles = queryVehicles.data?.results?.map((e) => ({
    id: e.id,
    brand: e.brand,
    domain: e.domain,
  }));

  const grafico = (
    <div className="matriz2-1 h-chart rounded-lg bg-white drop-shadow-md border-2">
      <div id="hireCancel" className="w-full h-full"></div>
    </div>
  );

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


  const filtros = (
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
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex p-8 w-full">
        <div className="w-1/3 p-4">
          {tarjeta}
          {grafico}
        </div>
        <div className="flex-1 p-4">
          {filtros}
          <div className="border-2 rounded-2xl p-4 ml-8 w-full m-8">
            {queryBookings.isLoading ? <Loader /> : <TableDashboard />}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Dashboard;
