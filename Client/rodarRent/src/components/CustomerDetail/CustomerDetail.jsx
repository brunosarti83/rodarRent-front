import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import DashboardActions from '../DashboardActions/DashboardActions';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import EditCustomer from '../EditCustomer/EditCustomer';
import EditBooking from '../EditBooking/EditBooking';
import CustomerInfo from '../CustomerInfo/CustomerInfo';
import WelcomeCustomer from '../WelcomeCustomer/WelcomeCustomer';
import { BsFillTrash3Fill } from 'react-icons/bs'
import { getCustomerDetailsUrl, getBookingsByIdCustomerUrl, getAllVehicles } from '../../helpers/routes';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routesHelper from "../../helpers/routes";

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isEditCustomerModalOpen, setIsEditCustomerModalOpen] = useState(false);
  const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(false);
  const [allVehicles, setAllVehicles] = useState([]);
  const modalRefCustomer = useRef();
  const modalRefBooking = useRef();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(getAllVehicles());
        const vehiclesArray = response.data.results;
        setAllVehicles(vehiclesArray);
      } catch (error) {
        console.error('Error fetching vehicles', error);
      }
    };

    fetchVehicles();
  }, []);


  const openEditCustomerModal = () => {
    setIsEditCustomerModalOpen(true);
  };

  const closeEditCustomerModal = () => {
    setIsEditCustomerModalOpen(false);

    toast.success('Customer information updated successfully', {
      position: 'top-left',
      autoClose: 3000,
    });
  };

  const openEditBookingModal = () => {
    setIsEditBookingModalOpen(true);
  };

  const closeEditBookingModal = () => {
    setIsEditBookingModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (modalRefCustomer.current && e.target === modalRefCustomer.current) {
      closeEditCustomerModal();
    } else if (modalRefBooking.current && e.target === modalRefBooking.current) {
      closeEditBookingModal();
    }
  };

  const closeModalOnClickOutside = (e) => {
    if (
      (modalRefCustomer.current && !modalRefCustomer.current.contains(e.target)) ||
      (modalRefBooking.current && !modalRefBooking.current.contains(e.target))
    ) {
      closeEditCustomerModal();
      closeEditBookingModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeModalOnClickOutside);
    return () => {
      document.removeEventListener('mousedown', closeModalOnClickOutside);
    };
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleEditBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    openEditBookingModal();
  };


  const handleLogout = () => {
    dispatch(logOut(navigate));
  };

  if (isLoading) {
    return <Loader />;
  }

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
    <div className="h-noNavDesktop font-poppins transition duration-300 dark:bg-slate-900 dark:text-gray-100">
      <div className="w-full h-16">
        <WelcomeCustomer customer={customer} onLogout={handleLogout} />
      </div>
      <div className="grid grid-cols-3 grid-row-3 h-customerDetail">
        <div className="flex justify-center col-start-1 col-end-3 row-start-1 row-end-3">
          <div className="w-full p-4">
            <div className="border-b-2 border-gray-300">
              <h1 className="text-2xl font-medium text-black dark:text-gray-100 font-poppins">
                Customer's Bookings
              </h1>
              {customerBookings.length === 0 ? (
                <p>No bookings found for this customer.</p>
              ) : (
                <div className="rounded-lg bg-white border border-gray-300 drop-shadow-md mt-10">
                  <table className="w-full h-max rounded-lg border-1 bg-gradient border-1 border-black">
                    <thead>
                      <tr>
                        <th>Vehicle</th>
                        <th>Start Date</th>
                        <th>Finish Date</th>
                        <th>Amount</th>
                        <th>State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="w-1/4 h-10 px-6 py-3 bg-white rounded-md shadow">
                            {allVehicles.map((vehicle) => (
                              vehicle.id === booking.VehicleId && (
                                <div key={vehicle.id}>
                                  <span>{vehicle.brand} - {vehicle.model}</span>
                                </div>
                              )
                            ))}
                          </td>
                          <td className="w-1/4 h-10 px-6 py-3 bg-white rounded-md shadow">
                            {booking.formattedStartDate}
                          </td>
                          <td className="w-1/4 h-10 px-6 py-3 bg-white rounded-md shadow">
                            {booking.formattedFinishDate}
                          </td>
                          <td className="w-1/4 h-10 px-6 py-3 bg-white rounded-md shadow">
                            ${booking.amount}
                          </td>
                          <td className="w-1/4 h-10 px-6 py-3 bg-white rounded-md shadow">
                            <div className="flex items-center justify-between">
                              <span
                                className={`${booking.stateBooking === 'completed'
                                  ? 'text-green-500'
                                  : booking.stateBooking === 'confirmed'
                                    ? 'text-yellow-500'
                                    : booking.stateBooking === 'pending'
                                      ? 'text-cyan-500'
                                      : booking.stateBooking === 'canceled'
                                        ? 'text-red'
                                        : ''
                                  }`}
                              >
                                {booking.stateBooking}
                              </span>
                              {booking.stateBooking === 'confirmed' && (
                                <button
                                  className="text-red px-2 py-1 rounded-md"
                                  onClick={() => handleEditBooking(booking.id)}
                                >
                                  <BsFillTrash3Fill />
                                </button>
                              )}
                              {booking.stateBooking === 'pending' && (
                                <button
                                  className="text-red px-2 py-1 rounded-md"
                                  onClick={() => handleEditBooking(booking.id)}
                                >
                                  <BsFillTrash3Fill />
                                </button>
                              )}
                            </div>
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

        <div className="flex w-full col-start-1 col-end-3 row-start-3 row-end-4">
          {customer && <CustomerInfo customer={customer} />}
        </div>

        <div className="row-start-1 row-end-4 col-start-3 flex justify-center">
          <DashboardActions openEditModal={openEditCustomerModal} />
        </div>

        <Modal
          isOpen={isEditCustomerModalOpen}
          onRequestClose={closeEditCustomerModal}
          shouldCloseOnOverlayClick={true}
          contentLabel="Edit Customer Modal"
          className="fixed inset-1/2 w'2/3 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white dark:bg-slate-900 rounded-sm shadow-lg"
          overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-10 bg-black"
          ref={modalRefCustomer}
          onAfterOpen={closeModalOnClickOutside}
        >
          <EditCustomer closeEditModal={closeEditCustomerModal} />
        </Modal>

        <Modal
          isOpen={isEditBookingModalOpen}
          onRequestClose={closeEditBookingModal}
          shouldCloseOnOverlayClick={true}
          contentLabel="Edit Booking Modal"
          className="fixed inset-1/2 w'2/3 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white dark:bg-slate-900 rounded-sm shadow-lg"
          overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-10 bg-black"
          ref={modalRefBooking}
          onAfterOpen={closeModalOnClickOutside}
        >
          {selectedBookingId && (
            <EditBooking bookingId={selectedBookingId} onClose={closeEditBookingModal} />
          )}
        </Modal>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default CustomerDetail;
