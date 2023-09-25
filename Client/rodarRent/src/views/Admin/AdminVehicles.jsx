//Hooks & Tools
import { useEffect, useState, useRef } from "react";
import { BiMessageAltCheck, BiMessageAltX, BiSearch } from "react-icons/bi";
import Modal from 'react-modal';
import axios from 'axios';
import { API_BASE_URL } from "../../helpers/routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Components
import Loader from "../../components/Loader/Loader"
import VehicleCard from "../../components/AdminComponents/AdminVehicles/VehicleCard";
import Pagination from "../../components/AdminComponents/AdminVehicles/PaginationAdminVehicle";
import EditVehicle from "../../components/AdminComponents/AdminVehicles/EditVehicle/EditVehicle";

const AdminVehicles = () => {

    const searchRef = useRef(null)

    const [loading, setLoading] = useState(true)
    //*Render, vehicles and pagination states
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [vehicles, setVehicles] = useState({ results: [] })
    //*Modal States
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    //*Selected Vehicle
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    //*SearchBar States
    const [domain, setDomain] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    //*carga inicial y paginado
    useEffect(() => {
        loading || setLoading(true);
        const limit = 3
        const offset = (currentPage - 1) * limit

        axios.get(`${API_BASE_URL}/vehicles`, { params: { limit, offset } })
            .then((response) => {
                setVehicles(response.data)
                setTotalPages(response.data.totalPages)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [currentPage])

    //*actualiza vehicles post eliminacion
    useEffect(() => {
        loading || setLoading(true);

        const limit = 3
        const offset = (currentPage - 1) * 3

        if (selectedVehicle === null) {
            axios
                .get(`${API_BASE_URL}/vehicles`, {
                    params: { limit, offset },
                })
                .then((response) => {
                    setVehicles(response.data);
                    setTotalPages(response.data.totalPages);
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setLoading(false)
        }
    }, [selectedVehicle]);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const openModal = (modalId, vehicleId, vehicleDomain) => {
        if (modalId === 1) {
            setIsDeleteModalOpen(true)
            setSelectedVehicle({ id: vehicleId, domain: vehicleDomain })
        } else {
            setIsEditModalOpen(true)
            setSelectedVehicle({id: vehicleId})
        }
    }

    const closeModal = (modalId) => {
        modalId === 1 ? setIsDeleteModalOpen(false) : setIsEditModalOpen(false)
    }

    const handleDelete = async (vehicleId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/vehicles/${vehicleId}`)
            toast.success(response.data)
            closeModal(1)
            setSelectedVehicle(null)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        const value = event.target.value
        setDomain(value)
    }

    const handleSubmit = async () => {
        if (domain) {
            try {
                const response = await axios.get(`${API_BASE_URL}/vehicles`, { params: { domain } })
                setIsSearching(true)
                setDomain('')
                setVehicles({ results: [] })
                setVehicles(response.data)
                if (searchRef.current) {
                    searchRef.current.value = '';
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            setIsSearching(false)
            setCurrentPage(2)
        }
    }

    return (
        <>
            {loading ?
                (<div className="h-full w-[calc(100vw-256px)] flex items-center justify-center " >
                    <Loader />
                </div>) :
                (<div className="w-[calc(100vw-256px)] h-full px-14 py-2" >
                    {/* SearchBar? */}
                    <div className="mb-3">
                        <div className="bg-white border text-lg border-gray-200 rounded-lg drop-shadow-lg w-1/6 flex items-center">
                            <input ref={searchRef} onChange={handleChange} className="px-3 py-2 w-4/5" type="text" placeholder="Type a car domain" />
                            <button onClick={handleSubmit} className="w-1/5 py-3 px-3 flex justify-center items-center hover:scale-125 transition-transform duration-300" >
                                <BiSearch />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between  ">
                        <div className="w-3/5 xl:w-4/6  flex flex-col justify-between" >
                            <div className="" >
                                {vehicles?.results?.map((vehicle, index) => (
                                    <VehicleCard
                                        index={index}
                                        key={index}
                                        vehicle={vehicle}
                                        openModal={openModal}
                                    />
                                ))}
                                {isSearching ? null : (
                                    <div className=" flex justify-center" >
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={onPageChange}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Actions Panel */}
                        <div className="w-1/5 bg-white border border-gray-200 drop-shadow-lg rounded-lg font-poppins p-4" >
                            <div className="text-4xl font-normal border-b border-b-gray-300" >
                                <h1>Actions</h1>
                            </div>
                        </div>
                    </div>
                    <Modal
                        className="w-2/6 p-4 bg-white rounded-lg dark:bg-slate-900"
                        overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-40 bg-black"
                        isOpen={isDeleteModalOpen}
                        onRequestClose={() => closeModal(1)}
                    >
                        {selectedVehicle && (
                            <div className="w-full h-full bg-white flex flex-col items-center justify-center font-poppins" >
                                <h3 className="text-2xl font-bold" >Are you sure you want to delete this vehicle?</h3>
                                <h2 className="pt-5 text-lg  " >Domain: <span className="font-semibold" >{selectedVehicle.domain}</span></h2>
                                <div className="flex justify-evenly w-full pt-5 " >
                                    <button onClick={() => handleDelete(selectedVehicle.id)} className=" w-1/5 py-1 flex justify-evenly items-center text-lg rounded-md border border-gray-300 bg-white drop-shadow-lg hover:drop-shadow-none hover:bg-green-700 hover:text-white transition-all duration-300">
                                        Yes
                                        <BiMessageAltCheck />
                                    </button>
                                    <button onClick={() => closeModal(1)} className=" w-1/5 py-1 flex items-center justify-evenly text-lg rounded-md border border-gray-300 bg-white drop-shadow-lg hover:drop-shadow-none hover:bg-red hover:text-white transition-all duration-300 " >
                                        No
                                        <BiMessageAltX />
                                    </button>
                                </div>
                            </div>
                        )}
                    </Modal>
                    <Modal
                        className="w-4/6 p-4 bg-white rounded-lg dark:bg-slate-900"
                        overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-40 bg-black"
                        isOpen={isEditModalOpen}
                        onRequestClose={() => closeModal(2)}
                    >
                        <EditVehicle selectedVehicle={selectedVehicle} />
                    </Modal>
                    <ToastContainer
                        position="top-left"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>)
            }
        </>
    )
}

export default AdminVehicles