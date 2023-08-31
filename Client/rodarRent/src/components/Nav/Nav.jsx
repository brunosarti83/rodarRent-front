/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom"
import routesHelper from "../../helpers/routes"
import tireLogo from '../../assets/img/tireLogo.png'
import { BiSun, BiMoon } from "react-icons/bi"

function Nav(props) {

    const {darkMode, toggleDarkMode} = props

    const location = useLocation()
    const isLanding = location.pathname !== '/'


    return (
        <header className="flex px-16 py-2 justify-between font-poppins bg-white dark:bg-slate-900 dark:text-gray-100 duration-300" >
            <div className="flex items-center" >
                <img className="w-16" src={tireLogo} alt="tire-logo" />
                <h2 className=" text-2xl">
                    {isLanding ? <Link to={routesHelper.landing}>RodarRent</Link> :'RodarRent'}
                </h2>
            </div>
            <nav className="flex items-center" >
                <ul className="flex text-xl" >
                    <li className="mr-14" ><Link to={routesHelper.aboutUs}>About Us</Link></li>
                    <li className="mr-14" ><Link to={routesHelper.cars}>Cars</Link></li>
                    <li className="mr-14" ><Link to={routesHelper.contact}>Contact</Link></li>
                </ul>
                <div onClick={toggleDarkMode} className="rounded-md drop-shadow-md bg-white dark:bg-slate-900 cursor-pointer p-1 transition duration-300 ease-in-out hover:drop-shadow-none " >
                    {darkMode ? <BiSun size='30px'/> : <BiMoon size='30px'/>}
                </div>
            </nav>
        </header>
    )
}

export default Nav