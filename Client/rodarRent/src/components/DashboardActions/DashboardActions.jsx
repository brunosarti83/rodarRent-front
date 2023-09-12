import React from 'react';
import { Link } from 'react-router-dom';
import DashboardActionsImg from '../../assets/img/dashboardClient.webp';

const DashboardActions = ({ openEditModal }) => {
  return (
    <div className="w-96 h-form rounded-t-lg p-4 flex flex-col items-center">
      <div className="w-full h-2/3">
        <img src={DashboardActionsImg} alt="Dashboard" className="w-full h-full object-cover rounded-t-lg" />
      </div>
      <div className='h-1/3 w-full bg-white drop-shadow-md p-4 border border-gray-300 rounded-b-lg dark:bg-slate-900'>
        <h2 className="text-lg font-bold text-left">Actions</h2>
        <hr className="border border-gray-300" />
        <ul className="flex flex-col items-center h-3/4 mt-4 justify-evenly">
          <li>
            <Link to="/subscribe" className="text-blue-600 py-1 px-8 rounded-lg bg-white drop-shadow-lg border border-gray-300 dark:bg-slate-950 hover:drop-shadow-none">Subscribe to our newsletter</Link>
          </li>
          <li>
            <Link to="/review" className="py-1 px-8 rounded-lg bg-white drop-shadow-lg text-blue-600 border border-gray-300 dark:bg-slate-950 hover:drop-shadow-none">Give us your review</Link>
          </li>
          <li>
            <button onClick={openEditModal} className="py-1 px-8 rounded-lg bg-white drop-shadow-lg text-blue-600 border border-gray-300 dark:bg-slate-950 hover:drop-shadow-none">Edit your personal info</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardActions;

