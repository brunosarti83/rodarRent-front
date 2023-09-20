/* eslint-disable react/prop-types */
import {BiTrash, BiEdit} from "react-icons/bi"

function VehicleCard({vehicle, openModal}) {
    return (
        <div className="border border-gray-200 drop-shadow-lg bg-white flex  mt-3 rounded-lg " >
            <div className="w-2/5 p-5" >
                <img className="" src={vehicle.image} alt="" />
            </div>
            <div className="w-3/5 h-full p-2 font-poppins" >
                <h2 className="text-4xl font-bold pt-7" >{`${vehicle.brand} ${vehicle.model}`}</h2>
                <h3 className="text-2xl font-light pt-2 " >{vehicle.domain}</h3>
                <div className="flex h-full text-2xl justify-end" >
                    <BiEdit onClick={() => openModal(2)} className=" cursor-pointer hover:scale-125 hover:text-blue transition-all duration-200" />
                    <BiTrash onClick={() => openModal(1, vehicle.id, vehicle.domain)} className="ml-2 cursor-pointer hover:scale-125 hover:text-red transition-all duration-200" />
                </div>
                <div className="w-full pt-2" >
                    <table className="w-full table-auto" >
                        <thead className="text-left border border-t-0 border-r-0 border-l-0 border-b-gray-300" >
                            <tr>
                                <th>Type</th>
                                <th>Transmission</th>
                                <th>Fuel</th>
                                <th>Capacity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{vehicle.type}</td>
                                <td>{vehicle.transmission}</td>
                                <td>{vehicle.fuel}</td>
                                <td>{vehicle.passengers}</td>
                                <td>{`$ ${vehicle.pricePerDay}.00`}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default VehicleCard