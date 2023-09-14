/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom"
import routesHelper from "../../helpers/routes"
import { GiCarKey } from "react-icons/gi"
import { BiSun, BiMoon, BiMenu } from "react-icons/bi"
import { useState } from "react"

function Nav(props) {

    const {darkMode, toggleDarkMode} = props
    
    const [dropMenu,setDropMenu] = useState(false)

    const handleDropMenu = () =>{
        setDropMenu(!dropMenu)
    }

    const location = useLocation()
    const isLanding = location.pathname !== '/'


    return (
        <header className="flex px-16 py-2 justify-between font-poppins bg-white dark:bg-slate-900 dark:text-gray-100 transition duration-300" >
            <div className="flex items-center" >
                <GiCarKey size='50px' />
                <h2 className=" ml-4 text-2xl">
                    {isLanding ? <Link to={routesHelper.landing}>RodarRent</Link> :'RodarRent'}
                </h2>
            </div>
            <nav className="flex items-center">
                <BiMenu onClick={handleDropMenu} size='50px' className=" 2xl:hidden xl:hidden lg:hidden md:block sm:block" />
                <ul className={`text-xl ${dropMenu ? 'hidden':'flex'}`} >
                    <li className="mr-14" ><Link to={routesHelper.aboutUs}>About Us</Link></li>
                    <li className="mr-14" ><Link to={routesHelper.cars}>Cars</Link></li>
                    <li className="mr-14" ><Link to={routesHelper.contact}>Contact</Link></li>
                </ul>
                <div onClick={toggleDarkMode} className="rounded-md drop-shadow-md bg-white dark:bg-slate-900 cursor-pointer p-1 ease-in-out hover:drop-shadow-none " >
                    {darkMode ? <BiSun size='30px'/> : <BiMoon size='30px'/>}
                </div>
            </nav>
        </header>
    )
}

export default Nav