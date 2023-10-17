import axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "./routes";

const useVehicleById = (id) => {
    const [vehicle, setVehicle] = useState({
        id: "",
        brand: "",
        model: "",
        transmission: "",
        fuel: "",
        passengers: "",
        price: "",
        image: "",
    });
    
    function getVehicleById(id) {
        try {
            axios.get(`${API_BASE_URL}/vehicles/${id}`)
            .then((vehicle) => {
                setVehicle({
                id: vehicle.data.id,
                brand: vehicle.data.brand,
                model: vehicle.data.model,
                transmission: vehicle.data.transmission,
                fuel: vehicle.data.fuel,
                passengers: vehicle.data.passengers,
                price: vehicle.data.pricePerDay,
                image: vehicle.data.image,
                });
            });
        } catch (err) {
            window.alert(`Error fetching vehicle by Id: ${err.message}`)
        }
    }

    useEffect(() => {
        getVehicleById(id);
    }, [id]);

    return vehicle
}

export default useVehicleById;