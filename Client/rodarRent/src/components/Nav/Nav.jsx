/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import routesHelper from "../../helpers/routes";
import { GiCarKey } from "react-icons/gi";
import { BiSun, BiMoon } from "react-icons/bi";
import { useState } from "react";

function Nav(props) {
    const { darkMode, toggleDarkMode } = props;

    const [isNavOpen, setIsNavOpen] = useState(false);

    const navItems = [
        { name: "About us", link: routesHelper.aboutUs },
        { name: "Cars", link: routesHelper.cars },
        { name: "Contact", link: routesHelper.contact },
    ];

    const location = useLocation();
    const isLanding = location.pathname !== "/";

    return (
        <header className=" h-28 flex xs:px-5 2xl:px-16 py-2 justify-between items-center font-poppins bg-white dark:bg-slate-900 dark:text-gray-100 transition duration-300">
            <div className="flex items-center">
                <GiCarKey size="50px" />
                <h2 className=" ml-4 text-2xl xs:text-lg md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl">
                    {isLanding ? (
                        <Link to={routesHelper.landing}>RodarRent</Link>
                    ) : (
                        "RodarRent"
                    )}
                </h2>
            </div>
            <nav>
                {/* Mobile Menu */}
                <section className="items-center flex lg:hidden">
                    <div
                        onClick={toggleDarkMode}
                        className="rounded-md drop-shadow-md mr-7 bg-white dark:bg-slate-900 cursor-pointer p-1 ease-in-out hover:drop-shadow-none "
                    >
                        {darkMode ? <BiSun size="30px" /> : <BiMoon size="30px" />}
                    </div>
                    <div
                        className="HAMBURGER-ICON space-y-2"
                        onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                        <span className="block h-0.5 w-8 bg-gray-600 dark:bg-gray-100 "></span>
                        <span className="block h-0.5 w-8 bg-gray-600 dark:bg-gray-100 "></span>
                        <span className="block h-0.5 w-8 bg-gray-600 dark:bg-gray-100 "></span>
                    </div>
                    <div className={`bg-white dark:bg-slate-900 ${isNavOpen ? "showMenuNav" : "hideMenuNav"}`}>
                        <div
                            className="absolute top-0 right-0 px-8 py-8"
                            onClick={() => setIsNavOpen(false)}
                        >
                            <svg
                                className="h-8 w-8 text-gray-600 dark:text-gray-100"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                        <ul className="flex flex-col text-black dark:text-gray-100 text-xl items-center justify-between min-h-[250px]">
                            {navItems.map((item, index) => (
                                <li onClick={()=> setIsNavOpen(!isNavOpen)} className="my-8" key={index}>
                                    <Link className="" to={item.link}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                {/* Desktop Menu */}
                <div className="flex items-center " >
                    <ul className="hidden text-xl space-x-8 lg:flex">
                        {navItems.map((item, index) => (
                            <li className="my-8" key={index}>
                                <Link to={item.link}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <div
                        onClick={toggleDarkMode}
                        className=" ml-7 rounded-md drop-shadow-md bg-white dark:bg-slate-900 cursor-pointer p-1 ease-in-out hover:drop-shadow-none xs:hidden sm:hidden md:hidden lg:block xl:block 2xl:block "
                    >
                        {darkMode ? <BiSun size="30px" /> : <BiMoon size="30px" />}
                    </div>
                </div>
            </nav>
            <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
        </header>
    );
}

export default Nav;
