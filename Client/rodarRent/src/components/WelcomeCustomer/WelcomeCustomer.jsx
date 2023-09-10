
const WelcomeCustomer = ({ customer, onLogout }) => {
  return (
    <div className="mt-4 flex justify-between mx-[3.5rem]">
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
            className=" bg-blue basis-2/4 p-8 text-gray-100 rounded-lg" 
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
