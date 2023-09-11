import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importa Link
import Loader from '../Loader/Loader';
import DashboardActions from '../DashboardActions/DashboardActions';
import CustomerInfo from '../CustomerInfo/CustomerInfo';
import WelcomeCustomer from '../WelcomeCustomer/WelcomeCustomer';
import { getCustomerDetailsUrl, getBookingsByIdCustomerUrl } from '../../helpers/routes';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions';

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
          const response = await fetch(getBookingsByIdCustomerUrl(id));
          const data = await response.json();
          const formattedData = data.map((booking) => ({
            ...booking,
            formattedStartDate: new Date(booking.startDate).toLocaleDateString(),
            formattedFinishDate: new Date(booking.finishDate).toLocaleDateString(),
          }));
          setCustomerBookings(formattedData);
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchCustomerBookings();
  }, [id]);

  const handleLogout = () => {
    dispatch(logOut(navigate))
  };

  if (isLoading) {
    return <Loader />;
  }

  // Función para dividir las reservas en páginas
  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(customerBookings.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentBookings = paginate(customerBookings);

  return (
    <div className=' h-noNavDesktop font-poppins transition duration-300 dark:bg-slate-900 dark:text-gray-100' >
      <div className="w-full h-16">
        <WelcomeCustomer customer={customer} onLogout={handleLogout} />
      </div>
      <div className="grid grid-cols-3 grid-row-3 h-customerDetail">
        <div className='flex justify-center col-start-1 col-end-3 row-start-1 row-end-3' >
          <div className="p-4 h-2/3">
            <div>
              <h2 className="text-32 font-medium text-black font-poppins">
                Customer's Bookings
              </h2>
              {customerBookings.length === 0 ? (
                <p>No bookings found for this customer.</p>
              ) : (
                <div>
                  <table className="w-full h-max rounded-lg border-1 bg-gradient border-1 border-black">
                    <thead>
                      <tr>
                        <th>Start Date</th>
                        <th>Finish Date</th>
                        <th>Amount</th>
                        <th>State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="w-1/4 h-12 px-6 py-3 bg-white rounded-md shadow">
                            {booking.formattedStartDate}
                          </td>
                          <td className="w-1/4 h-12 px-6 py-3 bg-white rounded-md shadow">
                            {booking.formattedFinishDate}
                          </td>
                          <td className="w-1/4 h-12 px-6 py-3 bg-white rounded-md shadow">
                            ${booking.amount}
                          </td>
                          <td className="w-1/4 h-12 px-6 py-3 bg-white rounded-md shadow">
                            {booking.stateBooking}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="w-2/3 h-1/3">
              <div className="mt-4 flex justify-between mx-[24rem]">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                  ❮
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                  ❯
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex col-start-1 col-end-3 row-start-3 row-end-4 ' >
          {customer && <CustomerInfo customer={customer} />}
        </div>
        <div className=' row-start-1 row-end-4 col-start-3 flex justify-center' >
          <DashboardActions customerId={id} />
        </div>

      </div>
    </div>
  );
};

export default CustomerDetail;
