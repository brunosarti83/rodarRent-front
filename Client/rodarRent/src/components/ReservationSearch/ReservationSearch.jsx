import { Link } from "react-router-dom"
import routesHelper from "../../helpers/routes"
import { useState } from "react"
import {useDispatch} from 'react-redux'
import { getAvaiability } from "../../redux/actions"


const ReservationSearch = () => {

  const dispatch = useDispatch()

  const [search,setSearch] = useState({
    pickUp:'',
    dropOff:''
  })

  const handleChange = (event) =>{
    const property = event.target.name
    const value = event.target.value
    setSearch({...search,[property]:value})
}

  const handleSubmit = (event) =>{
    event.preventDefault()
    dispatch(getAvaiability(search))
  }

  return (
    <div className=" h-18 w-full p-3 flex items-center justify-between font-poppins" >
      <div className="flex h-full w-2/3 " >
        <form className="flex w-full h-full items-center" action="">
          <div className="flex flex-col border bg-white drop-shadow-md rounded-lg w-2/6 p-2 h-full mr-32" >
            <label className="text-xs mb-2" >Pick up Date</label>
            <input onChange={handleChange} className="text-xs" type="date" name="pickUp" id="" />
          </div>
          <div className="flex flex-col border bg-white drop-shadow-md rounded-lg w-2/6 p-2 h-full mr-32" >
            <label className=" text-xs mb-2" >Drop off Date</label>
            <input onChange={handleChange} className="text-xs" type="date" name="dropOff" id="" />
          </div>
          <button onClick={handleSubmit} className="bg-blue text-white h-12 px-10 rounded-lg text-md" >Search</button>
        </form>
      </div>
      <div className="flex w-1/3 justify-evenly">
        <Link className="text-md py-3 px-10 rounded-lg transition duration-300 hover:bg-black hover:text-white" to={routesHelper.register}>
          Register
        </Link>
        <Link className="text-md text-blue font-semibold py-3 px-10 rounded-lg transition duration-300 hover:bg-blue hover:text-white" to={routesHelper.login}>
          Log in
        </Link>
      </div>
    </div>
  )
}

export default ReservationSearch