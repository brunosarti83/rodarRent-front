import React from 'react';
import { Link } from 'react-router-dom';

import DashboardActionsImg from "../../assets/img/dashboardClient.webp";

const DashboardActions = ({ customerId }) => {
  return (
    <div className="w-96 h-200 absolute top-128 right-32 rounded-t-lg p-4 flex flex-col items-center space-y-4 overflow-hidden">
      <div className="w-full h-2/3">
        <img src={DashboardActionsImg} alt="Dashboard" className="w-full h-full object-cover rounded-t-lg" />
      </div>
      <h2 className="text-lg font-bold text-left">Actions</h2>
      <hr className="w-2/3 mx-auto border border-gray-300" />
      <ul className="space-y-4 text-center">
        <li>
          <Link to="/subscribe" className="text-blue-600 hover:underline">Subscribe to our newsletter</Link>
        </li>
        <li>
          <Link to="/review" className="text-blue-600 hover:underline">Give us your review</Link>
        </li>
        <li>
          {/* Utiliza customerId para construir la URL de edición */}
          <Link to={`/edit-customer/${customerId}`} className="text-blue-600 hover:underline">Edit your personal info</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardActions;
