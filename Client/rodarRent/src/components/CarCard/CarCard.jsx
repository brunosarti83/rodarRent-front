import { Link } from 'react-router-dom';
import routesHelper from '../../helpers/routes';
import { GiGearStick, GiGasPump } from "react-icons/gi";
import { FaUserGroup } from "react-icons/fa6"
import { useSelector } from 'react-redux';

const CarCard = ({ car }) => {

  const isLogged = useSelector((state) => state.auth.isLoggedIn)

  return (
    <div className=" bg-white border border-gray-100 w-card h-card p-4 drop-shadow-md  rounded-xl font-poppins dark:bg-slate-950 dark:text-gray-100  transition duration-300">
      <Link to={`/cars/${car.id}`}>
        <div className="flex justify-center w-full h-36 ml-2">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-2/3"
          />
        </div>
        <div className='' >
          <h2 className="text-xl font-bold">{`${car.brand} ${car.model}`}</h2>
          <div>
            <h4 className='text-md text-gray-500 font-light' >Features</h4>
            <div className='flex mt-2 ' >
              <div>
                <div className='flex items-center' >
                  <FaUserGroup className=' text-gray-400 mr-2' size='25px' />
                  <p className='text-lg' >{car.passengers}</p>
                </div>
                <div className='flex items-center' >
                  <GiGasPump className=' text-gray-400 mr-2' size='25px' />
                  <p className='text-lg' >{car.fuel}</p>
                </div>
              </div>
              <div>
                <div className='flex items-center'>
                  <GiGearStick className=' text-gray-400 mr-2' size='25px' />
                  <p className='text-lg' >{car.transmission}</p>
                </div>
                {/* <p className="text-sm">Year:</p> */}
                {/* <p className="text-sm">Availability: {car.availability ? 'Available' : 'Not Available'}</p> */}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <hr className=' mt-1 mb-2 w-2/3 mx-auto' />
      <div className='flex items-center justify-between' >
        <p className="text-lg"><span className='font-bold' >{`$${car.pricePerDay}`}</span> per day</p>
        <Link to={routesHelper.booking}>
          <button disabled={isLogged ? false : true} className={`text-white bg-blue py-1 px-4 rounded-xl ${isLogged ? 'cursor-pointer' : 'cursor-not-allowed' }`}>Reserve Deal</button>
        </Link>
      </div>
    </div>
  );
};




export default CarCard;