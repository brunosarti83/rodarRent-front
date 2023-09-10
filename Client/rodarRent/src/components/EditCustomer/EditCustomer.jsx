import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { getCustomerDetailsUrl, updateCustomerInfoUrl } from '../../helpers/routes';

const EditCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const [editedFields, setEditedFields] = useState({
    id: '',
    name: '',
    lastName: '',
    personalId: '',
    birthDate: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    phoneNumber: '',
    email: '',
    password: '',
    isActive: true,
  });

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(getCustomerDetailsUrl(id));
        const data = await response.json();
        setCustomer(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error', error);
        setIsLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  useEffect(() => {

    if (customer) {
      setEditedFields({
        ...customer,
      });
    }
  }, [customer]);

  const handleFieldChange = (e) => {

    const { name, value } = e.target;
    setEditedFields({
      ...editedFields,
      [name]: value,
    });
  };


  const handleSaveAndBack = async () => {
    try {
      const response = await fetch(updateCustomerInfoUrl(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFields),
      });

      // Verifica si la solicitud fue exitosa (código de respuesta 200)
      if (response.ok) {
        const updatedData = await response.json();
        console.log('Datos actualizados:', updatedData);
        // Redirige de vuelta a los detalles del cliente
        {`/customer/${id}`}
      } else {
        // Si la solicitud no fue exitosa, maneja el error aquí
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Edit Customer</h2>
      <form>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={editedFields.id}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedFields.name}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={editedFields.lastName}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="personalId">Personal ID:</label>
          <input
            type="text"
            id="personalId"
            name="personalId"
            value={editedFields.personalId}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={editedFields.birthDate}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={editedFields.address}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={editedFields.city}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={editedFields.country}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={editedFields.zipCode}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={editedFields.phoneNumber}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={editedFields.email}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={editedFields.password}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label htmlFor="isActive">Is Active:</label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={editedFields.isActive}
            onChange={handleFieldChange}
          />
        </div>
        <button type="button" onClick={handleSaveAndBack}>
          Save
          
        </button>

        <Link to={`/customer/${id}`}>Back to Details</Link>
      </form>
    </div>
  );
};

export default EditCustomer;
