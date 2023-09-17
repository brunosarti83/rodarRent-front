/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import routesHelper from '../../helpers/routes';
import { logOut } from '../../redux/actions';
import { Link, useNavigate } from 'react-router-dom';

const AdminNav = () =>{

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch(logOut(navigate))
    }

    return(
        <div className=" h-full flex flex-col justify-center w-64 border-r-2 border-gray-200 " >
            <div className="flex flex-col h-52 justify-evenly items-center" >
                <Link to={routesHelper.admin} >
                    <button className="border border-gray-300 py-1  w-48 text-xl rounded-full bg-white drop-shadow-lg transition duration-300 active:drop-shadow-none" >Dashboard</button>
                </Link>
                <Link to={routesHelper.adminClients} >
                    <button className="border border-gray-300 py-1 w-48 text-xl rounded-full bg-white drop-shadow-lg transition duration-300 active:drop-shadow-none" >Clients</button>
                </Link>
                <Link to={routesHelper.adminVehicles} >
                    <button className="border border-gray-300 py-1 w-48 text-xl rounded-full bg-white drop-shadow-lg transition duration-300 active:drop-shadow-none " >Vehicles</button>
                </Link>
            </div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
};

export default AdminNav;
