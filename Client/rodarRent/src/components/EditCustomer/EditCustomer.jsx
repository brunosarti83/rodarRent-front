import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { getCustomerDetailsUrl, updateCustomerInfoUrl, updatePasswordUrl } from '../../helpers/routes';

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
  });

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState(null);

  const [buttonText, setButtonText] = useState('Save');

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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setButtonText('Save Password');
    setPasswordFields({
      ...passwordFields,
      [name]: value,
    });
  };

  const handleUpdatePassword = async () => {
    try {
      if (passwordFields.newPassword !== passwordFields.confirmPassword) {
        setPasswordError('Passwords do not match');
        return;
      }

      const response = await fetch(updatePasswordUrl(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          currentPassword: passwordFields.currentPassword,
          newPassword: passwordFields.newPassword,
        }),
      });
      setButtonText('Save');
      handleSaveAndBack()
      window.location.href = `/customer/${id}`

      if (response.ok) {
        setPasswordError(null);
          console.log("Actualizada");
      } else {
        const errorData = await response.json();
        setPasswordError(errorData.error);
      }
    } catch (error) {
      console.error('Error', error);
    }
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

      setButtonText('Save')
      window.location.href = `/customer/${id}`

      if (response.ok) {
        const updatedData = await response.json();
        console.log('Datos actualizados:', updatedData);
      } else {
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
    <div className="w-full h-full bg-white dark:bg-slate-900 duration-300 dark:text-gray-100 flex items-center justify-center">
      <div className="sticky drop-shadow-md border bg-white rounded-l-3xl dark:bg-slate-900">
        <form className="px-16 py-5 flex flex-col flex-wrap w-full rounded-xl justify-center">
          <h2 className="font-poppins p-2 text-3xl">Edit Customer</h2>
          <hr className="ml-8 mr-8 p-2 text-gray" />
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedFields.name}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={editedFields.lastName}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label htmlFor="personalId">Personal ID: </label>
            <input
              type="text"
              id="personalId"
              name="personalId"
              value={editedFields.personalId}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label htmlFor="birthDate">Birth Date: </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={editedFields.birthDate}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address: </label>
            <input
              type="text"
              id="address"
              name="address"
              value={editedFields.address}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label htmlFor="city">City: </label>
            <input
              type="text"
              id="city"
              name="city"
              value={editedFields.city}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label htmlFor="country">Country: </label>
            <input
              type="text"
              id="country"
              name="country"
              value={editedFields.country}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label htmlFor="zipCode">Zip Code: </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={editedFields.zipCode}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={editedFields.phoneNumber}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={editedFields.email}
              onChange={handleFieldChange}
            />
          </div>
          <label htmlFor="currentPassword">Current Password: </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwordFields.currentPassword}
            onChange={handlePasswordChange}
          />

          <div>
            <label htmlFor="newPassword">New Password: </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordFields.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordFields.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
          {passwordError && <p className="text-red-500">{passwordError}</p>}
          <div className="flex flex-col mt-4 mb-4">
            <button
              className="font-poppins bg-blue cursor-pointer rounded-lg p-1 m-2 text-white"
              onClick={handleUpdatePassword}
            >
              {buttonText}
            </button>
           
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditCustomer;