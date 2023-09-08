import AdminNav from "../../components/AdminNav/AdminNav"
import AdminDashboard from "./AdminDashboard"

const Admin = () =>{
    return(
        <div className="h-noNavDesktop w-full flex" >
            <AdminNav/>
            <AdminDashboard />
        </div>
    )
}

export default Admin