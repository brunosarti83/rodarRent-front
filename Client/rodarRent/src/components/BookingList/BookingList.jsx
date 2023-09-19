import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/actions";
import Loader from "../Loader/Loader";
import BookingCard from "../BookingCard/BookingCard";

function BookingList() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookingReducer.bookings);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  if (!bookings.data || bookings.data.length === 0) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Booking List</h2>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {bookings.data.map((booking) => (
          <li key={booking.id} style={{ marginBottom: "10px" }}>
            <BookingCard booking={booking} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
