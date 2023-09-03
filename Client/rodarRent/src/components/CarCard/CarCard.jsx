import { Link } from 'react-router-dom';
import routesHelper from '../../helpers/routes';

const CarCard = ({ car }) => {


  const {id, imageUrl, brand, model, transmission, fuelType, capacity, pricePerDay}= car

  return (
    <div className="border w-322 h-328 mt-77 ml-410 pl-2 pt-3 border-gray-400 rounded-lg">
      <Link to={`/detail/${car.id}`}>
        <div className="w-320 h-183 mt-145 ml-2">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="mb-2 w-278 h-142"
          />
          <h2 className="text-lg font-semibold">{`${car.brand} ${car.model}`}</h2>
          <p className="text-sm">Year: {car.year}</p>
          <p className="text-sm">Transmission: {car.transmission}</p>
          <p className="text-sm">Fuel Type: {car.fuel}</p>
          <p className="text-sm">Capacity: {car.passengers}</p>
          <p className="text-sm">Price per Day: {car.pricePerDay}</p>
          <p className="text-sm">Availability: {car.availability ? 'Available' : 'Not Available'}</p>
        </div>
      </Link>
      <button className="mt-2 inline-block text-blue-500 hover:underline">
        <Link to={routesHelper.booking}>Reserve Deal</Link>
      </button>
    </div>
  );
};

export default CarCard;