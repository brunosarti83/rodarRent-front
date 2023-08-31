import { Route, Routes } from 'react-router-dom'
import routesHelper from './helpers/routes';
import CarList from './components/Cars/Cars';
import Nav from './components/Nav/Nav';
import Landing from './views/Landing/Landing';
import ReservationSearch from './components/ReservationSearch/ReservationSearch';

function App() {
  return (
    <div>
      {renderNav ? <Nav/> : null}
      <ReservationSearch />
      <Routes>
        <Route path={routesHelper.cars} element={<CarList />} />
        <Route path={routesHelper.landing} element={<Landing />} />
        <Route path={routesHelper.login} element={<Login />} />
        <Route path={routesHelper.register} element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
