import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from '../../redux/actions';
import CustomerCard from '../CustomerCard/CustomerCard';
import Loader from '../Loader/Loader';

function CustomerList() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customerReducer.customers);

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);


  if (!customers.data || customers.data.length === 0) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.data.map((customer) => (
          <li key={customer.id}>
            <CustomerCard customer={customer} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;
