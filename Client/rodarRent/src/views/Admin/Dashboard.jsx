import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TableDashboard from "./TableDashboard";
import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";
import { GrafInfo } from "./GrafInfo";
import { InfoAmount } from "./InfoAmount";
import { FilterStatusCar } from "./filterStatusCar";
import EstadiscticSales from "./EstadisticSales";
import { FutureSales } from "./FutureSales";
import MostRequieredBrands from "./MostRequiredBrands";
import MostCityRequiered from "./MostCityRequiered";

const Dashboard = () => {
  function fetchBookings() {
    return fetch("http://localhost:3001/booking/filter").then((res) =>
      res.json()
    );
  }

  const queryBookings = useQuery(["bookings"], fetchBookings);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="Container grid grid-cols-6 gap-2">
        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 h-72 col-start-1 col-span-2">
          <EstadiscticSales />
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 h-72 col-start-3 col-span-2">
          <InfoAmount />
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 h-72 col-start-5 col-span-2">
          <GrafInfo />
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 p-4 m-2 h-full col-start-1 col-span-3">
          {queryBookings.isLoading ? <Loader /> : <TableDashboard />}
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 h-full col-start-4 col-span-3">
          <FilterStatusCar />
          <hr />
          <MostRequieredBrands />
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 col-start- col-span-4">
          <FutureSales />
        </div>

        <div className="border-2 rounded-2xl bg-gray-100 pl-2 m-2 col-start-5 col-span-2">
          <MostCityRequiered />
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Dashboard;
