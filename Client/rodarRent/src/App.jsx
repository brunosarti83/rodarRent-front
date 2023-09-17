import { Route, Routes } from 'react-router-dom'
import routesHelper from './helpers/routes';
import Home from './views/Home/Home'
import Nav from './components/Nav/Nav';
import Landing from './views/Landing/Landing';
import Login from './views/Login/login';
import Register from './views/Register/Register';
import Detail from './views/Detail/Detail'
import { useState } from 'react'
import Booking from './views/Booking/Booking';
import Contact from './views/Contact/Contact'
import AboutUs from './views/AboutUs/AboutUs'
import Admin from './views/Admin/Admin';
import adminRoutes from './helpers/adminRoutes';
import Dashboard from './views/Admin/Dashboard';

function App() {
  const [darkMode, setDarkmode] = useState(true)

  const toggleDarkMode = () => {
    const element = document.documentElement
    setDarkmode(!darkMode)
    if (darkMode) {
      element.classList.add('dark')
    } else {
      element.classList.remove('dark')
    }
  }

  return (
    <div>
      <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path={routesHelper.cars} element={<Home />} />
        <Route path={routesHelper.landing} element={<Landing />} />
        <Route path={routesHelper.login} element={<Login />} />
        <Route path={routesHelper.register} element={<Register />} />
        <Route path={routesHelper.detail} element={<Detail />} />
        <Route path={routesHelper.booking} element={<Booking />} />
        <Route path={routesHelper.aboutUs} element={<AboutUs />} />
        <Route path={routesHelper.contact} element={<Contact />} />
        <Route path={routesHelper.admin} element={<Admin/>}>
         <Route  index element={<Dashboard />} />
          <Route  path={adminRoutes.dashboard} element={<Dashboard />} />
        </Route> 
      </Routes>
    </div>
  );
}


export default App;