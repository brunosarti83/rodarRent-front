//Hooks & Tools
import { useDispatch, useSelector } from "react-redux";
import { getVehicle, setFilters } from "../../redux/actions";
import { useEffect } from "react";
import { BiTrash, BiEdit } from "react-icons/bi"; 
//Components
import Pagination from '../../components/Pagination/Pagination'

const AdminVehicles = () => {

    const dispatch = useDispatch();

    const vehicles = useSelector((state) => state.veh.vehicles.results);
    const filterObject = useSelector((state) => state.veh.filterObject);


    useEffect(() => {
        dispatch(getVehicle({ limit: 3 }))
    }, [dispatch])

    // const onPageChange = (pageNumber) => {
    //     dispatch(
    //         setFilters({
    //             ...filterObject,
    //             offset: (pageNumber - 1) * filterObject.limit,
    //         })
    //     );
    // };

    const onChangeOrder = (orderBy, direction) => {
        dispatch(
            setFilters({
                ...filterObject,
                orderBy,
                direction,
                offset: 0,
            })
        );
    };

    console.log(vehicles)
    return (
        <div className="w-[calc(100vw-256px)] h-full" >
            <div className="w-3/5 h-adminCardWrapper" >
                <div className="" >
                    {vehicles?.map((vehicle, index) => (
                        <div className="border border-gray-200 drop-shadow-lg bg-white flex h-full mt-3 rounded-lg " key={index}>
                            <div className="w-2/5 p-5" >
                                <img className="w-full h-full" src={vehicle.image} alt="" />
                            </div>
                            <div className="w-3/5 h-full p-2 font-poppins" >
                                <h2 className="text-4xl font-bold pt-7" >{`${vehicle.brand} ${vehicle.model}`}</h2>
                                <h3 className="text-2xl font-light pt-2 " >{vehicle.domain}</h3>
                                <div className="flex h-full text-2xl justify-end" >
                                    <BiEdit className=" cursor-pointer hover:scale-125 hover:text-blue transition-all duration-200" />
                                    <BiTrash className="ml-2 cursor-pointer hover:scale-125 hover:text-red transition-all duration-200" />
                                </div>
                                <div className="w-full pt-2" >
                                    <table className="w-full table-auto" >
                                        <thead className=" text-left border border-b-gray-300" >
                                            <th>Type</th>
                                            <th>Transmission</th>
                                            <th>Fuel</th>
                                            <th>Capacity</th>
                                            <th>Price</th>
                                        </thead>
                                        <tbody>
                                            <td>{vehicle.type}</td>
                                            <td>{vehicle.transmission}</td>
                                            <td>{vehicle.fuel}</td>
                                            <td>{vehicle.passengers}</td>
                                            <td>{`$ ${vehicle.pricePerDay}.00`}</td>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default AdminVehicles