import CarList from "../../components/CarList/CarList";
import ReservationSearch from "../../components/ReservationSearch/ReservationSearch";
import { getLocalStorage } from "../../helpers/storage";
import { useEffect } from "react";
import { rememberLogin } from "../../redux/actions";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const isUserLogged = getLocalStorage("isLoggedIn");

  useEffect(() => {
    if (isUserLogged) {
      dispatch(rememberLogin());
    }
  }, [isUserLogged]);

    return (
        <div className="flex flex-col">
            <ReservationSearch /> 
            <CarList />
        </div>
    )
}

export default Home;
