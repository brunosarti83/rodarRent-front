import { Link } from 'react-router-dom';
import routesHelper from '../../helpers/routes';

const CarCard = ({ car }) => {


  const {id, imageUrl, brand, model, transmission, fuelType, capacity, pricePerDay}= car

  return (
    <div className="border p-4">
      <Link to={`/detail/${id}`}>
        <img src={imageUrl} alt={`${brand} ${model}`} className="mb-2" />
        <h2 className="text-lg font-semibold">{`${brand} ${model}`}</h2>
        <p className="text-sm">Transmission: {transmission}</p>
        <p className="text-sm">Fuel Type: {fuelType}</p>
        <p className="text-sm">Capacity: {capacity}</p>
        <p className="text-sm">Price per Day: {pricePerDay}</p>
      </Link>
      <button className="mt-2 inline-block text-blue-500 hover:underline">
        <Link to={routesHelper.booking}>Reserve Deal</Link>
      </button>
    </div>
  );
};

export default CarCard;
