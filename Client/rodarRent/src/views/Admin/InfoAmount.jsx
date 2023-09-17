import { useQuery } from "react-query";
import Loader from "../../components/Loader/Loader";


export const InfoAmount = ()=>{

    function fetchBookings() {
        return fetch("http://localhost:3001/booking/filter").then((res) =>
          res.json()
        );
      }
      const queryBookings = useQuery(["bookings"], fetchBookings);


  // const incomeToday = queryBookings.isSuccess ? queryBookings?.data
  //   ?.map((e) => e.amount)
  //   .reduce((a, b) => a + b) : 0;

return (
    <div className="col-span-1 md:col-span-1 mb-8">
      <div className="flex-col w-auto rounded-2xl border-2 drop-shadow-md">
        <div className="flex w-full justify-around pt-6">
          <div className="font-semibold text-lg">INCOME</div>
          <div className="font-semibold text-lg">TODAY</div>
        </div>
        <Loader />
        {/* <div className="text-center mt-10">
          {!incomeToday ? (
            <Loader />
          ) : (
            <div className="text-5xl">${incomeToday}</div>
          )}
          <hr className="border-t-2 border-gray-300 w-3/4 mx-auto my-6" />
        </div> */}
      </div>
    </div>
)
}