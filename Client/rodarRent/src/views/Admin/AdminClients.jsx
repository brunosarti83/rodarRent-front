import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from '../../redux/actions';
import Loader from '../../components/Loader/Loader';
import { FaCheck, FaTimes } from "react-icons/fa"; 

function AdminClients() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customerReducer.customers);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);


  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

 
  const handleCustomerSelect = (customerId) => {
    if (selectedCustomers.includes(customerId)) {
     
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
     
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

 
  const handleSelectAll = () => {
    if (selectAll) {
     
      setSelectedCustomers([]);
    } else {
      
      const allCustomerIds = customers.data.map(customer => customer.id);
      setSelectedCustomers(allCustomerIds);
    }
   
    setSelectAll(!selectAll);
  };

  if (!customers.data || customers.data.length === 0) {
    return <Loader />;
  }

  return (
    <div>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Personal ID</th>
            <th>Country</th>
            <th>City</th>
            <th>Address</th>
            <th>Email</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {customers.data.map((customer) => (
            <tr key={customer.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={() => handleCustomerSelect(customer.id)}    
                />
              </td>
              <td><a href={`/customer/${customer.id}`}>{customer.name}</a></td>
              <td><a href={`/customer/${customer.id}`}>{customer.lastName}</a></td>
              <td><a href={`/customer/${customer.id}`}>{customer.personalId}</a></td>
              <td><a href={`/customer/${customer.id}`}>{customer.country}</a></td>
              <td><a href={`/customer/${customer.id}`}>{customer.city}</a></td>
              <td><a href={`/customer/${customer.id}`}>{customer.address}</a></td>
              <td><a href={`/customer/${customer.id}`}>{customer.email}</a></td>
              <td>
                {customer.isActive ? (
                  <FaCheck  />
                ) : (
                  <FaTimes  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminClients;
