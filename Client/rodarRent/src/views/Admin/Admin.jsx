import AdminNav from "../../components/AdminNav/AdminNav"
import { Outlet } from "react-router-dom"

const Admin = () =>{
    return(
        <div className="h-noNavDesktop w-full flex">
            <AdminNav/>
            <Outlet /> 
        </div>
    )
}

export default Admin