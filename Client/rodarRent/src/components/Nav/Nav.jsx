import { Link, useLocation } from "react-router-dom"
import routesHelper from "../../helpers/routes"
import tireLogo from '../../assets/img/tireLogo.png'

function Nav() {
    
    const location = useLocation()
    const isLanding = location.pathname !== '/'

    return (
        <header className="flex px-16 py-2 justify-between font-poppins" >
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
            </nav>
        </header>
    )
}

export default Nav