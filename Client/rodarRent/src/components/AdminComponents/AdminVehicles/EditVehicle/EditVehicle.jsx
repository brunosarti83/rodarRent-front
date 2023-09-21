import axios from "axios"
import { API_BASE_URL } from "../../../../helpers/routes"
import { useEffect, useState } from "react"

const EditVehicle = ({selectedVehicle}) =>{

    const [vehicle,setVehicle] = useState(null)
    const {id} = selectedVehicle

    useEffect(()=>{
        axios
            .get(`${API_BASE_URL}/vehicles/${id}`)
            .then((response)=>{
                setVehicle(response)
            })

    })
    
    return(
        <div>

        </div>
    )
}

export default EditVehicle