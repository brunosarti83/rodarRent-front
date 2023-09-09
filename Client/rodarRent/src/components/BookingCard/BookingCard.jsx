import React from 'react';

const BookingCard = ({ booking, formattedStartDate, formattedFinishDate }) => {
  return (
    <div>
      <div>
        <p><strong>ID:</strong> {booking.id}</p>
        <p><strong>Start Date:</strong> {formattedStartDate}</p>
        <p><strong>Finish Date:</strong> {formattedFinishDate}</p>
        <p><strong>Pick Up Location ID:</strong> {booking.pickUpLocationId}</p>
        <p><strong>Return Location ID:</strong> {booking.returnLocationId}</p>
        <p><strong>State Booking:</strong> {booking.stateBooking}</p>
        <p><strong>Amount:</strong> {booking.amount}</p>
        <p><strong>Is Deleted:</strong> {booking.isDeleted ? 'Yes' : 'No'}</p>
        <p><strong>Pay ID:</strong> {booking.PayId || 'N/A'}</p>
        <p><strong>Customer ID:</strong> {booking.CustomerId || 'N/A'}</p>
        <p><strong>Vehicle ID:</strong> {booking.VehicleId || 'N/A'}</p>
      </div>
    </div>
  );
};

export default BookingCard;


