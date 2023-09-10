import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importa Link
import Loader from '../Loader/Loader';
import DashboardActions from '../DashboardActions/DashboardActions';
import CustomerInfo from '../CustomerInfo/CustomerInfo';
import WelcomeCustomer from '../WelcomeCustomer/WelcomeCustomer';
import { getCustomerDetailsUrl, getBookingsByIdCustomerUrl } from '../../helpers/routes';

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(getCustomerDetailsUrl(id));
        const data = await response.json();
        setCustomer(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error', error);
        setIsLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  useEffect(() => {
    const fetchCustomerBookings = async () => {
      try {
        if (id) {
          const response = await fetch(getBookingsByIdCustomerUrl(id)); // Usamos el mismo id para las reservas
          // const response = await fetch('http://localhost:3001/bookings/');
          const data = await response.json();
          setCustomerBookings(data.map((booking) => ({
            ...booking,
            formattedStartDate: new Date(booking.startDate).toLocaleDateString(),
            formattedFinishDate: new Date(booking.finishDate).toLocaleDateString()
          })));
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchCustomerBookings();
  }, [id]);

  const handleLogout = () => {
    // Función para realizar el logout
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="w-full">
        <WelcomeCustomer customer={customer} onLogout={handleLogout} />
      </div>
      <div className="flex">
        <div className="w-2/3 p-4">
          <div>
            <h2 className="text-32 font-medium text-black font-poppins">
              Customer's Bookings
            </h2>
            {customerBookings.length === 0 ? (
              <p>No bookings found for this customer.</p>
            ) : (
              <table className="w-full rounded-lg border-1 bg-gradient border-1 border-black shadow mt-2 mb-2">
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <th>Finish Date</th>
                    <th>Amount</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {customerBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="w-13 h-13 px-6 py-3 bg-white rounded-md shadow">
                        {booking.formattedStartDate}
                      </td>
                      <td className="w-13 h-13 px-6 py-3 bg-white rounded-md shadow">
                        {booking.formattedFinishDate}
                      </td>
                      <td className="w-13 h-13 px-6 py-3 bg-white rounded-md shadow">
                        ${booking.amount}
                      </td>
                      <td className="w-13 h-13 px-6 py-3 bg-white rounded-md shadow">
                        {booking.stateBooking}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="w-full rounded-lg border-1 bg-gradient border-1 border-black shadow mt-2 mb-2">
            {customer && <CustomerInfo customer={customer} />}
          </div>
        </div>


        <div className="w-1/3 p-4">
      <div className="flex justify-end">
        {/* Pasa id como prop a DashboardActions */}
        <DashboardActions customerId={id} />
      </div>
    </div>
      </div>
    </div>
  );

};
export default CustomerDetail;
