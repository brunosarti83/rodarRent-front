import { useEffect, useState } from "react";
import * as echarts from "echarts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TableDashboard from "./TableDashboard";
import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";
import { GrafInfo } from "./GrafInfo";
import { InfoAmount } from "./InfoAmount";
import { FilterStatusCar } from "./FilterStatusCar";

const Dashboard = () => {
  function fetchBookings() {
    return fetch("http://localhost:3001/booking/filter").then((res) =>
      res.json()
    );
  }

  const queryBookings = useQuery(["bookings"], fetchBookings);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex p-8 w-full">
        <div className="w-1/3 p-4">
          <InfoAmount />
          <GrafInfo />
        </div>
        <div className="flex-1 p-4">
          <FilterStatusCar />
          <div className="border-2 rounded-2xl p-4 ml-8 w-full m-8">
            {queryBookings.isLoading ? <Loader /> : <TableDashboard />}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Dashboard;
