import AdminNav from "../../components/AdminComponents/AdminNav/AdminNav"
import { Outlet } from "react-router-dom"

const Admin = () =>{
    return(
        <div className="min-h-[calc(100vh-112px)] w-full flex dark:bg-salte-900  ">
            <AdminNav/>
            <Outlet /> 
        </div>
    )
}

export default Admin