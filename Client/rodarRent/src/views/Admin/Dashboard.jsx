
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TableDashboard from "./TableDashboard";
import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";
import { GrafInfo } from "./GrafInfo";
import { InfoAmount } from "./InfoAmount";
import { FilterStatusCar } from "./filterStatusCar";
import  StackedBarChart  from "./EstadisticSales";

const Dashboard = () => {

function fetchBookings() {
    return fetch("http://localhost:3001/booking/filter").then((res) =>
      res.json()
    );
  }

const queryBookings = useQuery(["bookings"], fetchBookings);

return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="p-8 w-full grid grid-cols-3 gap-4">
        <div>
          <StackedBarChart />
        </div>
        <div>
          <InfoAmount />
        </div>
          <div>
          <FilterStatusCar />
          </div>
          <div>
          <GrafInfo />
          </div>
          
        <div className="col-span-2 p-4">
          <div className="border-2 rounded-2xl p-4 ml-8 w-full m-8">
            {queryBookings.isLoading ? <Loader /> : <TableDashboard />}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Dashboard;
