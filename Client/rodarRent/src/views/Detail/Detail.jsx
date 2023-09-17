import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import routesHelper, { API_BASE_URL } from '../../helpers/routes';
import { BiArrowBack } from "react-icons/bi"

export default function Detail({ saveState }) {
  const [vehicle, setVehicle] = useState({
    id: "",
    brand: "",
    model: "",
    transmission: "",
    fuel: "",
    passengers: "",
    price: "",
    image: "",
  });

  const { id } = useParams();

  function getVehicleById(id) {
    axios.get(`${API_BASE_URL}/vehicles/${id}`).then((vehicle) => {
      setVehicle({
        id: vehicle.data.id,
        brand: vehicle.data.brand,
        model: vehicle.data.model,
        transmission: vehicle.data.transmission,
        fuel: vehicle.data.fuel,
        passengers: vehicle.data.passengers,
        price: vehicle.data.pricePerDay,
        image: vehicle.data.image,
      });
    });
  }

  useEffect(() => {
    getVehicleById(id);
  }, [id]);

  return (
    <div className="bg-gray-100 w-full h-noNavDesktop flex flex-col">
      {(!vehicle.model && <Loader />) || (
        <div className='h-full px-28 py-8 font-poppins transition duration-300 dark:bg-slate-900 dark:text-gray-100' >
          <Link className='border flex w-36 justify-evenly items-center border-gray-300 bg-white text-xl drop-shadow-md py-1 rounded-lg font-normal transition duration-300 hover:drop-shadow-none dark:bg-slate-950' to={routesHelper.cars} onClick={() => saveState()}>
            <BiArrowBack />
            Back
          </Link><br />
          <div className='w-full h-5/6 flex items-center justify-between' >
            <div className=' w-1/2 self-end' >
              <img className='w-full' src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} />
            </div>
            <div className=' xl:w-96 2xl:w-100 rounded-3xl p-6 bg-white drop-shadow-md border transition duration-300 border-gray-300 dark:bg-slate-950'>
              <div>
                <h2 className='text-2xl font-extralight'>{vehicle.brand}</h2>
                <h1 className='text-5xl mt-3 font-semibold'>{vehicle.model}</h1>
              </div>
              <hr className='mt-3 border-gray-300' />
              <div className='mt-3' >
                <h2 className=' text-2xl font-extralight'>Price per Day</h2>
                <h1 className=' text-5xl mt-3 font-semibold' >${vehicle.price}.00</h1>
              </div>
              <hr className='mt-3 border-gray-300' />
              <div>
                <h2 className='text-xl mt-3 w-full font-extralight' >Specifications:</h2>
                <div className='mt-3 grid grid-cols-2 w-full border border-gray-200 bg-white drop-shadow-md p-2 rounded-xl dark:bg-slate-900'>
                  <div className='text-md' >
                    <p className='font-light' >Brand: <span className='font-semibold' >{vehicle.brand}</span></p>
                    <p className='font-light' >Model: <span className='font-semibold' >{vehicle.model}</span></p>
                    <p className='font-light' >Transmission:  <span className='font-semibold' >{vehicle.transmission}</span></p>
                  </div>
                  <div className='ml-10' >
                    <p className='font-light' >Fuel: <span className='font-semibold' >{vehicle.fuel}</span></p>
                    <p className='font-light' >Capacity: <span className='font-semibold' >{vehicle.passengers}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
