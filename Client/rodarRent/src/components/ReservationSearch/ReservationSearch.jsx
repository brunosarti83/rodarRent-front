// Hooks & tools
import routesHelper from "../../helpers/routes";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// Actions
import { setFilters } from "../../redux/actions";

const ReservationSearch = () => {
  const dispatch = useDispatch();
  const filterObject = useSelector((state) => state.veh.filterObject);
  const userData = useSelector((state) => state.auth.customer[0]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get(`${routesHelper.baseBackUrl}/locations`)
      .then(({ data }) => {
        setLocations(data);
      })
      .catch((error) => {
        window.alert(
          `An error ocurred retrieving locations from server: ${error.message}`
        );
      });
  }, []);

  const [search, setSearch] = useState({
    startDate: filterObject.startDate ? filterObject.startDate : "",
    finishDate: filterObject.finishDate ? filterObject.finishDate : "",
    pickUpLocationId: filterObject.pickUpLocationId
      ? filterObject.pickUpLocationId
      : "",
    returnLocationId: filterObject.returnLocationId
      ? filterObject.returnLocationId
      : "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    let value = event.target.value;
    if (property === 'startDate' && (new Date(value) <= new Date() || new Date(value) >= new Date(search.finishDate))) { value = "" }
    if (property === 'finishDate' && new Date(value) <= new Date(search.startDate)) { value = "" }
    setSearch({ ...search, [property]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      setFilters({
        ...filterObject,
        startDate: search.startDate,
        finishDate: search.finishDate,
        pickUpLocationId: search.pickUpLocationId,
        returnLocationId: search.returnLocationId,
        offset: 0,
      })
    );
  };

  const disableButton =
    !search.startDate ||
    !search.finishDate ||
    !search.pickUpLocationId ||
    !search.returnLocationId ||
    new Date(search.finishDate) <= new Date(search.startDate);

  // * Variable para verificar si el usuario es el admin
  const isAdmin = userData?.id === "fd2daf55-3d6a-4254-ad40-74adc5229cde";

  return (
    <div className=" h-18 w-full p-3 flex items-center justify-between font-poppins dark:bg-slate-900 dark:text-gray-100 transition duration-300">
      <div className="flex h-full ml-5">
        <form className="flex w-full h-full items-center" action="">
          <div className="flex flex-col border bg-white drop-shadow-md rounded-lg w-2/6 px-2 py-2.5 h-full mr-2 dark:bg-slate-950">
            <label className="text-xs mb-2">Pick up Date</label>
            <input
              onChange={handleChange}
              className="text-xs border rounded dark:bg-slate-950"
              type="date"
              name="startDate"
              value={search.startDate || ""}
              id=""
            />
          </div>
          <div className="flex flex-col border bg-white drop-shadow-md rounded-lg w-2/6 px-2 py-2.5 h-full mr-2 dark:bg-slate-950">
            <label className=" text-xs mb-2">Return Date</label>
            <input
              onChange={handleChange}
              className="text-xs border rounded dark:bg-slate-950"
              type="date"
              name="finishDate"
              value={search.finishDate || ""}
              id=""
            />
          </div>
          <div className="flex flex-col border bg-white drop-shadow-md rounded-lg w-2/6 p-2 h-full mr-2 dark:bg-slate-950">
            <label className=" text-xs mb-2 mt-1">Pick Up Location</label>
            <select
              className="text-xs border rounded dark:bg-slate-950"
              name="pickUpLocationId"
              value={search.pickUpLocationId || ""}
              onChange={handleChange}
            >
              <option value="">Choose pick up location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {`${loc.alias} - ${loc.city}`}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col border bg-white drop-shadow-md rounded-lg w-2/6 p-2 h-full mr-2 dark:bg-slate-950">
            <label className=" text-xs mb-2 mt-1">Return Location</label>
            <select
              className="text-xs border rounded dark:bg-slate-950"
              name="returnLocationId"
              value={search.returnLocationId || ""}
              onChange={handleChange}
            >
              <option value="">Choose a return location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {`${loc.alias} - ${loc.city}`}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSubmit}
            disabled={disableButton}
            className="bg-blue text-white h-12 px-10 ml-4 rounded-lg text-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </form>
      </div>
      {isLoggedIn ? (
        <div className="flex w-1/3 justify-center">
          <Link
            className="text-md text-blue font-semibold py-3 px-10 rounded-lg transition duration-300 hover:bg-blue hover:text-white"
            to={isAdmin ? "/admin" : `/customer/${userData.id}`}
          >
            My profile
          </Link>
        </div>
      ) : (
        <div className="flex w-1/3 justify-evenly">
          <Link
            className="text-md py-3 px-10 rounded-lg transition duration-300 hover:bg-black hover:text-white"
            to={routesHelper.register}
          >
            Register
          </Link>
          <Link
            className="text-md text-blue font-semibold py-3 px-10 rounded-lg transition duration-300 hover:bg-blue hover:text-white"
            to={routesHelper.login}
          >
            Log in
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReservationSearch;
