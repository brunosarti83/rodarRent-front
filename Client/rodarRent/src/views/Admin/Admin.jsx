import AdminNav from "../../components/AdminNav/AdminNav"
import { Outlet } from "react-router-dom"

const Admin = () =>{
    return(
        <div className="h-noNavDesktop w-full flex p-4 ">
            <AdminNav/>
            <Outlet /> 
        </div>
    )
}

export default Admin