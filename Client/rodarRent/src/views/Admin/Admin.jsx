import AdminNav from "../../components/AdminComponents/AdminNav/AdminNav"
import { Outlet } from "react-router-dom"

const Admin = () =>{
    return(
        <div className="h-[calc(100vh-112px)] w-full flex">
            <AdminNav/>
            <Outlet /> 
        </div>
    )
}

export default Admin