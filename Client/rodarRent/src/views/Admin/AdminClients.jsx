import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../helpers/routes";
import {FaCheck, FaTimes} from "react-icons/fa"
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/AdminComponents/AdminVehicles/PaginationAdminVehicle";
import axios from "axios";

function AdminClients() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; 

  useEffect(() => {
    loading || setLoading(true);
    const limit = pageSize;
    const offset = (currentPage - 1) * limit;

    axios
      .get(`${API_BASE_URL}/customers`, { params: { limit, offset } })
      .then((response) => {
        setCustomers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error", error);
        setLoading(false);
      });
  }, [currentPage]);

  const handleCustomerSelect = (customerId) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCustomers([]);
    } else {
      const allCustomerIds = customers.map((customer) => customer.id);
      setSelectedCustomers(allCustomerIds);
    }
    setSelectAll(!selectAll);
  };


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredCustomers = customers.filter((customer) => {
    const searchableFields = [
      customer.name,
      customer.lastName,
      customer.personalId,
      customer.country,
      customer.city,
      customer.address,
      customer.email,
      customer.isActive ? "Yes" : "No",
    ];

    return searchableFields.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return <Loader />;
  }

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const customersInCurrentPage = filteredCustomers.slice(startIndex, endIndex);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
            <th className="w-60">Name</th>
            <th className="w-60">Last Name</th>
            <th className="w-60">Personal ID</th>
            <th className="w-60">Country</th>
            <th className="w-60">City</th>
            <th className="w-60">Address</th>
            <th className="w-60">Email</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {customersInCurrentPage.map((customer) => (
            <tr key={customer.id} style={{ height: "40px" }}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={() => handleCustomerSelect(customer.id)}
                />
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.name}</a>
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.lastName}</a>
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.personalId}</a>
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.country}</a>
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.city}</a>
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.address}</a>
              </td>
              <td>
                <a href={`/customer/${customer.id}`}>{customer.email}</a>
              </td>
              <td>
                {customer.isActive ? <FaCheck /> : <FaTimes />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AdminClients;
