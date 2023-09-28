import { BiLogOut} from "react-icons/bi"


const WelcomeCustomer = ({ customer, onLogout }) => {
  return (
    <div className="h-full flex justify-between items-center px-14">
      {customer && (
        <div className="flex items-center">
        <h2 className="text-3xl font-semibold" >Welcome Back! <span className=" text-blue" >{`${customer.name} ${customer.lastName}`}</span></h2>
        </div>
      )}
      {customer && (
        <div>
          <button
            className=" bg-blue basis-2/4 py-1 w-44 text-gray-100 rounded-lg text-xl flex items-center justify-evenly" 
            onClick={onLogout}
          >
            <BiLogOut size='24px'/>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeCustomer;
