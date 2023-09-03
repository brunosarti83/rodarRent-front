import {BiCalendar} from "react-icons/bi";

function ReservationSearch() {

  return (
    <div className=" w-full flex items-center justify-between  h-24 bg-red-950" >
      <div className="flex">
        <form action="" >
            <div className="" >
                <BiCalendar/>
                <div className="  flex-col">
                  <label htmlFor="">Pick up Date</label>
                  <input type="date" name="" id="" />
                </div>
            </div>
            <div>

            </div>
        </form>
      </div>
      <div className="flex" >
        <h2>Register</h2>
        <h2>Login</h2>
      </div>
    </div>
  )
}

export default ReservationSearch