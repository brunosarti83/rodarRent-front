import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

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
    return <Loader/>;
  }

  return (
    <div className="w-840 h-271 top-631 left-84 px-32 py-38">
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
    </div>
  );
};

export default CustomerDetail;




