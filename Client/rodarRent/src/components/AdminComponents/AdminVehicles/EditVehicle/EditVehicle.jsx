import axios from "axios"
import { API_BASE_URL } from "../../../../helpers/routes"
import { useEffect, useState } from "react"
//Components
import Loader from "../../../Loader/Loader"

const EditVehicle = ({selectedVehicle}) =>{

    const [vehicle,setVehicle] = useState(null)
    const [loading,setLoading] = useState(false)

    const {id} = selectedVehicle

    useEffect(()=>{
        loading || setLoading(true)
        const fetchVehicleData = async () =>{
            try {
                const response = await axios.get(`${API_BASE_URL}/vehicles/${id}`)
                setVehicle(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

    },[id])
    
    console.log(vehicle)
    return(
        <div>
            {loading ? (
                <Loader />
            ):(

            )}
        </div>
    )
}

export default EditVehicle