import React from 'react';
import { Link } from 'react-router-dom';

const CustomerCard = ({ customer }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg my-4">
      <div>
        <div className="ml-4">
          <h2>{`${customer.name} ${customer.lastName}`}</h2>
          <div>
            <p><strong>ID:</strong> {customer.id}</p>
            <p><strong>Personal Id:</strong> {customer.personalId}</p>
            <p><strong>Date of Birth:</strong> {customer.birthDate}</p>
            <p><strong>Address:</strong> {customer.address}</p>
            <p><strong>City:</strong> {customer.city}</p>
            <p><strong>Country:</strong> {customer.country}</p>
            <p><strong>Zip Code:</strong> {customer.zipCode}</p>
            <p><strong>Phone:</strong> {customer.phoneNumber}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Active:</strong> {customer.isActive ? 'Yes' : 'No'}</p>
          </div>
          <Link to={`/customer/${customer.id}`} className="text-blue-600 hover:underline">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
