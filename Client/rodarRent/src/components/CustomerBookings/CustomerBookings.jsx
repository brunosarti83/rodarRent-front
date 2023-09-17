import React from 'react';
import BookingCard from '../BookingCard/BookingCard';

const CustomerBookings = ({ bookings }) => {
  return (
    <div>
      <h2>Customer's Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found for this customer.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <BookingCard booking={booking} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerBookings;
