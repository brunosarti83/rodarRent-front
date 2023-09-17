//Hooks & Tools
import { useDispatch, useSelector } from "react-redux";
import { getVehicle, setFilters } from '../../redux/actions'
import { useEffect } from "react";
//Components
import Pagination from '../../components/Pagination/Pagination'
import OrderCars from "../../components/OrderCars/OrderCars";

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
        <div className="w-[calc(100vw-256px)] h-[calc(100vh-112px)]" >
            <div className="border border-black" >
                <OrderCars filterObject={filterObject} onChangeOrder={onChangeOrder} />
            </div>
            <div className="border w-3/5 border-black h-adminCardWrapper" >
                <div className="" >
                    {vehicles?.map((vehicle, index) => (
                        <div key={index}>
                            <p>{vehicle.domain}</p>
                            <br />
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