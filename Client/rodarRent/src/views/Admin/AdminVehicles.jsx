//Hooks & Tools
import { useDispatch, useSelector } from "react-redux";
import { getVehicle } from '../../redux/actions'
import { useEffect } from "react";

const AdminVehicles = () => {

    const dispatch = useDispatch();

    const vehicles = useSelector((state)=>state.veh.vehicles)

    useEffect(()=>{
        dispatch(getVehicle({limit:3}))
    },[dispatch])

    return (
        <div className="w-full h-[calc(100vh-112px)]" >
            <div>

            </div>
            <div>
            
            </div>
            <div>

            </div>
        </div>
    )
}

export default AdminVehicles