/* eslint-disable react/prop-types */
import { logOut } from '../../redux/actions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AdminNav = (props) => {
    const { onDashboardChange, currentView } = props;

    const [activeButton, setActiveButton] = useState('');

    const handleButtonClick = (dashboardName) => {
        setActiveButton(dashboardName); 
        onDashboardChange(dashboardName);
    };

    const buttons = [
        { name: 'Dashboard', key: 'dashBoard' }, 
        { name: 'Clients', key: 'clients' },
        { name: 'Vehicles', key: 'vehicles' },
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut(navigate))
    };

    return (
        <div className="h-full flex flex-col justify-center w-64 border-r-2 border-gray-200">
            <div className="flex flex-col h-52 justify-evenly items-center">
                {buttons.map((button) => (
                    <button
                        key={button.key}
                        onClick={() => handleButtonClick(button.key)}
                        className={`border border-gray-300 py-1 w-48 text-xl rounded-full bg-white transition duration-300 dark:bg-slate-950 ${
                            currentView === button.key ? 'drop-shadow-none' : 'drop-shadow-xl'
                        } ${activeButton === button.key ? 'drop-shadow-none' : 'drop-shadow-xl'}`}>
                        {button.name}
                    </button>
                ))}
            </div>
            <button onClick={handleLogout} >Log Out</button>
        </div>
    );
};

export default AdminNav;
