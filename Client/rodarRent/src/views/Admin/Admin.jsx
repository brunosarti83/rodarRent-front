import AdminNav from "../../components/AdminNav/AdminNav"
import AdminDashboard from "./AdminDashboard"
import AdminClients from "./AdminClients"
import AdminVehicles from "./AdminVehicles"
import { useState } from "react"

const dashboardView = {
    dashBoard: AdminDashboard,
    clients: AdminClients,
    vehicles: AdminVehicles
}

const Admin = () =>{

    const [selectedView,setSelectedView] = useState('dashBoard')

    const handleDashboardChange = (dashboardName) =>{
        setSelectedView(dashboardName)
    }

    const RenderDashboardView = dashboardView[selectedView] || AdminDashboard

    return(
        <div className="h-noNavDesktop w-full flex transition duration-300 dark:bg-slate-900 dark:text-gray-100 " >
            <AdminNav onDashboardChange={handleDashboardChange} currentView={selectedView} />
            <RenderDashboardView />
        </div>
    )
}

export default Admin