import {Route, Routes, useLocation} from 'react-router-dom'
import routesHelper from './helpers/routes';
import CarList from './components/Cars/Cars';
import Nav from './components/Nav/Nav';
import Landing from './views/Landing/Landing';
import Login from './views/Login/login';
import Register from './views/Register/Register'

function App() {

  const location = useLocation()
  const renderNav = location.pathname !==routesHelper.contact || location.pathname !== routesHelper.register

  return (
    <div>
      {renderNav ? <Nav/> : null}
      <Routes>
        <Route path={routesHelper.cars} element={<CarList/>}/>
        <Route path={routesHelper.landing} element={<Landing/>}/>
        <Route path={routesHelper.login} element={<Login/>}/>
        <Route path={routesHelper.register} element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
