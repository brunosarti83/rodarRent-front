import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CarCard from '../CarCard/CarCard';
import CarFilter from '../CarFilter/CarFilter';
import Pagination from '../Pagination/Pagination';
import { getVehicle } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const mapStateToProps = (state) => {
  return {
    vehicles: state.vehicleReducer.vehicles, 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVehicle: () => dispatch(getVehicle()), 
  };
};


const CarList = ({ vehicles, getVehicle }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVehicle().then(() => {
      setLoading(false); 
    });
  }, [getVehicle]);

  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  useEffect(() => {
    setFilteredCars(vehicles);
  }, [vehicles]);

  const handleFilter = (filterOptions) => {
    const filteredResults = vehicles.filter(car => {
      const brandFilter = !filterOptions.brand || car.brand === filterOptions.brand;
      const modelFilter = !filterOptions.model || car.model === filterOptions.model;
      const transmissionFilter = filterOptions.transmissions.length === 0 || filterOptions.transmissions.includes(car.transmission);
      const fuelTypeFilter = filterOptions.fuelTypes.length === 0 || filterOptions.fuelTypes.includes(car.fuel);
      const capacityFilter = filterOptions.passengers.length === 0 || filterOptions.passengers.includes(car.capacity);
      const priceFilter = car.pricePerDay >= filterOptions.priceRange[0] && car.pricePerDay <= filterOptions.priceRange[1];

      return brandFilter && modelFilter && transmissionFilter && fuelTypeFilter && capacityFilter && priceFilter;
    });

    setFilteredCars(filteredResults);
    setCurrentPage(1);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const carsToShow = filteredCars.slice(startIndex, endIndex);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex w-full justify-between dark:bg-slate-900 dark:text-gray-100 transition duration-300 ">
          <div className="w-1/4 p-4 dark:bg-slate-900" style={{ height: '827px' }}>
            <h1 className="text-xl font-bold mb-4">Filter By</h1>
            <CarFilter carData={filteredCars} onFilter={handleFilter} />
          </div>
          <div className=" w-3/4 flex flex-col p-7">
            <div className="w-full flex flex-wrap justify-between gap-y-4">
              {carsToShow.map((car) => (
                <Link to={`/car/${car.id}`} key={car.id}>
                  <CarCard car={car} />
                </Link>

              ))}
            </div>
            <div className="w-full mt-4">
              <Pagination
                carList={filteredCars}
                carsPerPage={carsPerPage}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CarList);
