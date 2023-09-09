import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Loader from '../Loader/Loader';
import img from '../../assets/img/customer.png'

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/customers/${id}`);
        const data = await response.json();

        setCustomer(data);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  if (!customer) {
    return <Loader />;
  }

  return (
    <div className='w-full h-noNavDesktop font-poppins transition duration-300 dark:bg-slate-900 dark:text-gray-100'>
      <div className='flex justify-between h-20 items-center p-10' >
        <h1 className=' text-3xl font-semibold' >Welcome Back!   <span className='text-blue' >{customer.name}</span></h1>
        <Link className='bg-blue text-white flex items-center justify-evenly  w-40 rounded-lg border-none py-1 px-3 text-2xl' >
          <BiLogOut />
          Log Out
        </Link>
      </div>
      <div className='grid grid-cols-3 grid-rows-2 h-full' >
        <div className='border col-start-1 col-end-3 row-start-1 row-end-1 border-black' >

        </div>
        <div className='border col-start-1 col-end-3 row-start-2 border-black' >

        </div>
        <div className='border col-start-3 row-start-1 row-end-3 flex justify-center pt-10 border-black' >
          <div className='h-form rounded-2xl border border-gray-300 bg-white drop-shadow-md w-96'>
            <div className=' h-2/3 flex flex-col items-center rounded-t-2xl bg-blue justify-evenly'>
              <div className='text-4xl font-semibold text-white ' >
                <h2>What can we do</h2>
                <h2>for you today?</h2>
              </div>
              <div>
                <img src={img} alt="customer-hero-png" />
              </div>
            </div>
            <div className='bg-white rounded-b-2xl dark:bg-slate-900  text-lg p-5 h-1/3'>
              <div className=' border-b-2 border-gray-300 ' >
                <h3>Actions</h3>
              </div>
              <div className='flex flex-col items-center pt-4 h-full' >
                <button className='border border-gray300 bg-white drop-shadow-md py-1 px-4 rounded-lg active:drop-shadow-none dark:bg-slate-950 ' >Suscribe to our newsletter</button>
                <button className='border border-gray300 mt-5 bg-white drop-shadow-md py-1 px-4 rounded-lg active:drop-shadow-none dark:bg-slate-950 ' > Give us your Review</button>
                <button className='border border-gray300 mt-5 bg-white drop-shadow-md py-1 px-4 rounded-lg active:drop-shadow-none dark:bg-slate-950 ' > Edit your personal Info</button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-840 h-271 top-631 left-84 px-32 py-38">
          <div className="w-769 h-59 left-39 px-20 py-17">
            <p className="text-24 font-medium text-white bg-black w-205 h-26 top-17 left-20">
              Personal Info
            </p>
            <div className="w-766 h-145 top-88 left-39 rounded-lg border-1 bg-gradient border-1 border-black shadow">
              <div className="grid grid-cols-3 grid-rows-3 gap-3">
                <div className="w-218 h-27 top-14 left-16 px-6 py-6 bg-white rounded-md shadow">
                  <p>Name: {customer.name}</p>
                </div>
                <div className="w-218 h-27 top-14 left-16 px-6 py-6 bg-white rounded-md shadow">
                  <p>Last Name: {customer.lastName}</p>
                </div>
                <div className="w-218 h-27 top-14 left-16 px-6 py-6 bg-white rounded-md shadow">
                  <p>Personal ID: {customer.id}</p>
                </div>
                <div className="w-218 h-27 top-14 left-16 px-6 py-6 bg-white rounded-md shadow">
                  <p>Birth Date: {customer.birthDate}</p>
                </div>
                <div className="w-218 h-27 top-14 left-16 px-6 py-6 bg-white rounded-md shadow">
                  <p>Address: {customer.address}</p>
                </div>
                <div className="w-218 h-27 top-14 left-16 px-6 py-6 bg-white rounded-md shadow">
                  <p>City: {customer.city}</p>
                </div>
                <div className="w-218 h-27 top-14 left-16 px-6 py-6 bg-white rounded-md shadow">
                  <p>Country: {customer.country}</p>
                </div>
                <div className="w-218 h-27 top-14 left-16 px-6 py-6 bg-white rounded-md shadow">
                  <p>Zip Code: {customer.zipCode}</p>
                </div>
                <div className="w-218 h-27 top-14 left-16 px-6 py-6 bg-white rounded-md shadow">
                  <p>Phone: {customer.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CustomerDetail;




