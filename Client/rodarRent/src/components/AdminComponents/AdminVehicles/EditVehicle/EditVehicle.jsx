/* eslint-disable react/prop-types */
import axios from "axios"
import { API_BASE_URL } from "../../../../helpers/routes"
import { useEffect, useState } from "react"
import { BiErrorCircle } from "react-icons/bi";
//Components
import Loader from "../../../Loader/Loader"
import ImageUpload from "../../ImageUpload/ImageUpload"
import { toast } from "react-toastify"
import validate from './validateEditedVehicle'

const EditVehicle = ({ selectedVehicle }) => {

    const [vehicle, setVehicle] = useState(null)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [editedFields, setEditedFields] = useState({
        brand: '',
        model: '',
        domain: '',
        type: '',
        capacity: '',
        transmission: '',
        typeOfFuel: '',
        pricePerDay: ''
    })

    const[showError,setShowError] = useState(false)
    const [errors, setErrors] = useState({
        brand: '',
        model: '',
        domain: '',
        type: '',
        capacity: '',
        transmission: '',
        typeOfFuel: '',
        pricePerDay: ''
    })

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
                setEditedFields({
                    brand: vehicle.brand,
                    model: vehicle.model,
                    domain: vehicle.domain,
                    type: vehicle.type,
                    capacity: vehicle.passengers,
                    transmission: vehicle.transmission,
                    typeOfFuel: vehicle.fuel,
                    pricePerDay: vehicle.pricePerDay,
                });
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchVehicleData()
    }, [id])


    const handleImageUpload = (imageUrl) => {
        setImage(imageUrl)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setEditedFields({ ...editedFields, [name]: value })
        const validationErrors = validate({
            ...editedFields,
            [name]:value
        })
        setErrors(validationErrors)
    }

    const handleSubmit = () => {
        console.log('submiteado')
    }

    console.log(editedFields)
    console.log(errors)
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div className="font-poppins p-2" >
                    <div className="font-bold text-xl" >
                        <h2>Edit Your Vehicle</h2>
                    </div>
                    <div>
                        <form action="">
                            <div className="flex justify-between pt-3 " >
                                <label htmlFor="">Brand:</label>
                                <input name="brand" onChange={handleChange} type="text" className="border border-gray-200 drop-shadow-lg px-3 py-1 text-end w-2/5 rounded-lg" defaultValue={vehicle?.brand} />
                            </div>
                            <div className="flex justify-between pt-3 " >
                                <label htmlFor="">Model:</label>
                                <div className="w-2/5 flex justify-between items-center relative">
                                    {errors.brand && (
                                        <div onMouseEnter={() => setShowError(true)}
                                            onMouseLeave={() => setShowError(false)}
                                        >
                                            <BiErrorCircle className="text-red text-xl cursor-pointer" />
                                        </div>)}
                                        {showError &&(
                                                <div className=" bg-white text-red absolute -bottom-10 transform -translate-x-1/2 z-20 p-2" >
                                                    {errors.brand}
                                                </div>
                                        )}
                                    <input name="model" onChange={handleChange} type="text" className="border border-gray-200 drop-shadow-lg px-3 py-1 text-end rounded-lg w-5/6" defaultValue={vehicle?.model} />
                                </div>
                            </div>
                            <div className="flex justify-between pt-3 " >
                                <label htmlFor="">Domain:</label>
                                <input name="domain" onChange={handleChange} type="text" className="border border-gray-200 drop-shadow-lg px-3 py-1 text-end w-2/5 rounded-lg" defaultValue={vehicle?.domain} />
                            </div>
                            <div className="flex justify-between pt-3 " >
                                <label htmlFor="">Type:</label>
                                <select onChange={handleChange} name="type" id="" className="border border-gray-200 drop-shadow-lg px-3 py-1 text-end w-2/5 rounded-lg" defaultValue={vehicle?.type} >
                                    {carEnums.type.map((el, index) => (
                                        <option key={index} value={el}>{el}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-between pt-3 " >
                                <label htmlFor="">Capacity:</label>
                                <input name="capacity" onChange={handleChange} type="text" className="border border-gray-200 drop-shadow-lg px-3 py-1 text-end w-2/5 rounded-lg" defaultValue={vehicle?.passengers} />
                            </div>
                            <div className="flex justify-between pt-3 " >
                                <label htmlFor="">Transmission:</label>
                                <select onChange={handleChange} name="transmission" id="" className="border border-gray-200 drop-shadow-lg px-3 py-1 text-end w-2/5 rounded-lg" defaultValue={vehicle?.transmission} >
                                    {carEnums.transmission.map((el, index) => (
                                        <option key={index} value={el}>{el}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-between pt-3" >
                                <label htmlFor="">Type of Fuel:</label>
                                <select onChange={handleChange} name="typeOfFuel" id="" className="border border-gray-200 drop-shadow-lg px-3 py-1 text-end w-2/5 rounded-lg" defaultValue={vehicle?.fuel}>
                                    {carEnums.fuel.map((el, index) => (
                                        <option key={index} value={el}>{el}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-between pt-3" >
                                <label htmlFor="">Price per Day:</label>
                                <input name="pricePerDay" onChange={handleChange} type="text" className="border border-gray-200 drop-shadow-lg px-3 py-1 text-end w-2/5 rounded-lg" defaultValue={`$ ${vehicle?.pricePerDay}.00`} />
                            </div>
                            <div className="flex flex-col justify-between pt-5" >
                                <div className="h-40">
                                    <img className="w-full h-full object-contain" src={image ? image : vehicle?.image} alt={`${vehicle?.brand} ${vehicle?.model}`} />
                                </div>
                                <div className="" >
                                    <ImageUpload newImage={handleImageUpload} toast={toast} />
                                </div>
                            </div>
                            <button className="mt-6 px-3 py-1 bg-blue text-white rounded-xl" onClick={handleSubmit} >Save</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditVehicle