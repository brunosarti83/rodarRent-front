import axios from "axios"
import { API_BASE_URL } from "../../../../helpers/routes"
import { useEffect, useState } from "react"
//Components
import Loader from "../../../Loader/Loader"
import ImageUpload from "../../ImageUpload/ImageUpload"

const EditVehicle = ({ selectedVehicle }) => {

    const [vehicle, setVehicle] = useState(null)
    const [loading, setLoading] = useState(false)

    const carEnums = {
        type: ['compact', 'sedan', 'pickup', 'SUV', 'sport'],
        transmission: ['manual', 'automatic'],
        fuel: ['gas', 'diesel', 'electric', 'hybrid'],
    };

    const { id } = selectedVehicle

    useEffect(() => {
        loading || setLoading(true)
        const fetchVehicleData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/vehicles/${id}`)
                setVehicle(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchVehicleData()
    }, [id])


    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div>
                        <h2>Edit Your Vehicle</h2>
                    </div>
                    <div>
                        <form action="">
                            <div>
                                <label htmlFor="">Brand</label>
                                <input type="text" defaultValue={vehicle?.brand} />
                            </div>
                            <div>
                                <label htmlFor="">Model</label>
                                <input type="text" defaultValue={vehicle?.model} />
                            </div>
                            <div>
                                <label htmlFor="">Domain</label>
                                <input type="text" defaultValue={vehicle?.domain} />
                            </div>
                            <div>
                                <label htmlFor="">Type</label>
                                <select name="" id="" defaultValue={vehicle?.type} >
                                    {carEnums.type.map((el,index)=>(
                                        <option key={index} value={el}>{el}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="">Capacity</label>
                                <input type="text" defaultValue={vehicle?.passengers} />
                            </div>
                            <div>
                                <label htmlFor="">Transmission</label>
                                <select name="" id="" defaultValue={vehicle?.transmission} >
                                    {carEnums.transmission.map((el,index)=>(
                                        <option key={index} value={el}>{el}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="">Type of Fuel</label>
                                <select name="" id="" defaultValue={vehicle?.transmission}>
                                    {carEnums.fuel.map((el,index)=>(
                                        <option key={index} value={el}>{el}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="">Price per Day</label>
                                <input type="text" defaultValue={`$ ${vehicle?.pricePerDay}.00`} />
                            </div>
                            <div className="flex h-32" >
                                <img src={vehicle?.image} alt={`${vehicle?.brand} ${vehicle?.model}`} />
                                <div>
                                    <div>
                                        <ImageUpload />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}

export default EditVehicle