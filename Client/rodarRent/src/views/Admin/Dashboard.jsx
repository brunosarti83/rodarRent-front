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
      <div className="Container grid grid-cols-6 gap-4 m-4">

        <div className="border-2 rounded-2xl pl-4 col-start-1 col-span-2 h-3/5 ">
          <EstadiscticSales />
        </div>

        <div className="border-2 rounded-2xl pl-4 col-start-3 col-span-2 h-3/5 ">
          <InfoAmount />
        </div>

        <div className="col-start-5 col-span-2 border-2 rounded-2xl pl-4 h-3/5">
          <GrafInfo />
        </div>

        <div className="col-start-1 col-span-3">
          <div className="border-2 rounded-2xl p-4 w-full">
            {queryBookings.isLoading ? <Loader /> : <TableDashboard />}
          </div>
        </div>

        <div className="col-start-4 col-span-3 border-2 rounded-2xl h-1/2">
          <FilterStatusCar />
        </div>

        <div className="col-start-4 col-span-3 border-2 rounded-2xl pl-4">
          <MostRequieredBrands />
        </div>


        <div className="col-start-1 col-span-4 border-2 rounded-2xl pl-4 h-1/2">
          <FutureSales />
        </div>


         <div className="col-start-5 col-span-2 border-2 rounded-2xl pl-4 h-1/2">
           <MostCityRequiered />
         </div>
          
      </div>
    </LocalizationProvider>
  );
};

export default Dashboard;
