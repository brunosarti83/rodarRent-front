import { Link } from "react-router-dom"
import adminRoutes from "../../helpers/adminRoutes"

const AdminNav = () =>{
    return(
        <div className=" h-full flex flex-col justify-center w-64 border-r-2 border-gray-200 " >
            <div className="flex flex-col h-52 justify-evenly items-center" >
                <Link to={adminRoutes.dashboard}>
                    <button className="border border-gray-300 py-1  w-48 text-xl rounded-full bg-white drop-shadow-lg transition duration-300 active:drop-shadow-none" >Dashboard</button>
                </Link>
                <Link to={adminRoutes.clients}>
                    <button className="border border-gray-300 py-1 w-48 text-xl rounded-full bg-white drop-shadow-lg transition duration-300 active:drop-shadow-none" >Clients</button>
                </Link>
                <Link to={adminRoutes.vehicles}>
                    <button className="border border-gray-300 py-1 w-48 text-xl rounded-full bg-white drop-shadow-lg transition duration-300 active:drop-shadow-none " >Vehicles</button>
                </Link>
            </div>
        </div>
    )
} 

export default AdminNav