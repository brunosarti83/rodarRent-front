import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader/Loader";
import PaginationAdminCustomer from "../../components/AdminComponents/AdminClients/PaginationAdminCustomer";
import axios from "axios";
import { BiTrash } from 'react-icons/bi';
import { API_BASE_URL } from "../../helpers/routes";

function AdminClients() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [error, setError] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({
    name: "",
    orderVar: "lastName",
    orderMode: "ASC", 
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/customers/filter`, {
        params: {
          ...filterCriteria, 
          page: currentPage,
          pageSize,
        },
      });

      setCustomers(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError("Error loading customers.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, filterCriteria]);


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

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };


  const handleDeactivateSelectedCustomer = async (customerIds) => {
    try {
      const deactivateRequests = customerIds.map(async (customerId) => {
        const deleteResponse = await axios.delete(`${API_BASE_URL}/customers/${customerId}`);

        if (deleteResponse.status === 200) {
          return { success: true };
        } else {
          return { success: false };
        }
      });

      const results = await Promise.all(deactivateRequests);
      const hasError = results.some((result) => !result.success);

      if (!hasError) {
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) => {
            if (customerIds.includes(customer.id)) {
              return {
                ...customer,
                isActive: false,
              };
            }
            return customer;
          })
        );
        setSelectedCustomers([]);
      } else {
        setError("Error deactivating some customers.");
      }
    } catch (error) {
      setError("Error deactivating some customers.");
    }
  };


  if (loading) {
    return <Loader />;
  }

  const handleFilterChange = (key, value) => {
    setFilterCriteria({
      ...filterCriteria,
      [key]: value,
    });
  };

  return (
    <div className="w-[calc(100vw-256px)] h-full justify-between px-14 py-2">

      <div className="flex w-full justify-between">
        <div className="w-2/4 mb-3">
          <div className="bg-white border text-lg border-gray-200 rounded-lg drop-shadow-lg w-full flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-2/4 p-2"
            />
          </div>
        </div>
      <div className="w-1/4 flex justify-between mb-3">
        <div className="w-full bg-white border text-lg border-gray-200 rounded-lg drop-shadow-lg flex items-center" >
          <select
            className="w-full"
            value={filterCriteria.orderVar}
            onChange={(e) => handleFilterChange("orderVar", e.target.value)}
          >
            <option value="lastName">Last Name</option>
            <option value="name">Name</option>
            <option value="city">City</option>
            <option value="country">Country</option>
            <option value="isActive">Status</option>
          </select>
        </div>
        <div className="w-full bg-white border text-lg border-gray-200 rounded-lg drop-shadow-lg flex items-center justify-end" >
          <select
            value={filterCriteria.orderMode}
            onChange={(e) => handleFilterChange("orderMode", e.target.value)}
          >
            
            <option value="ASC">ASC</option>


            <option value="DESC">DESC</option>
          </select>
        </div>
      </div>
        <button
          className="w-1/4 p-2 flex items-center justify-end"
          onClick={() => handleDeactivateSelectedCustomer(selectedCustomers)}
          disabled={selectedCustomers.length === 0}
        >
          <BiTrash className="ml-2 cursor-pointer hover:scale-125 hover:text-red transition-all duration-200 text-2xl" />
        </button>
      </div>
    

      {error && <div className="error-message">{error}</div>}

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
          {filteredCustomers.map((customer) => (
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

      <div className="flex justify-center">
        <PaginationAdminCustomer
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default AdminClients;
