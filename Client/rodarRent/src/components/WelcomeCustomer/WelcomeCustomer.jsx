
const WelcomeCustomer = ({ customer, onLogout }) => {
  return (
    <div className="flex justify-between items-center w-full">
      {customer && (
        <div className="flex items-center">
          <p className="text-3xl text-black font-bold">
            {`Welcome back! ${customer.name} ${customer.lastName}`}
          </p>
        </div>
      )}
      {customer && (
        <div>
          <button
            className=" bg-blue basis-1/4 p-6 text-gray-100 rounded-r-lg" 
            onClick={onLogout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeCustomer;
