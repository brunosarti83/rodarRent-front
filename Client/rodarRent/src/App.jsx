import {Route, Routes, useLocation} from 'react-router-dom'
import routesHelper from './helpers/routes';
import CarList from './components/Cars/Cars';
import Nav from './components/Nav/Nav';
import Landing from './views/Landing/Landing';
import ReservationSearch from './components/ReservationSearch/ReservationSearch';

function App() {

  const location = useLocation()
  const renderNav = location.pathname !==routesHelper.contact || location.pathname !== routesHelper.register

  return (
    <div>
      {renderNav ? <Nav/> : null}
      <ReservationSearch />
      <Routes>
        <Route path={routesHelper.cars} element={<CarList/>}/>
        <Route path={routesHelper.landing} element={<Landing/>}/>
      </Routes>
    </div>
  );
}

export default App;
