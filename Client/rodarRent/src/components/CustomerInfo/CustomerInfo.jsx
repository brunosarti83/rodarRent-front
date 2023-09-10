import React from 'react';

const CustomerInfo = ({ customer }) => {
  return (
    <div className="w-full">
      <h1 className="text-32 font-medium text-black font-poppins">
             Personal Info
      </h1>
      <div className="w-full rounded-lg border-1 bg-gradient border-1 border-black shadow mt-2 mb-2">
        <div className="grid grid-cols-3 grid-rows-3 gap-3">
          {[
            { label: 'Name', value: customer.name },
            { label: 'Last Name', value: customer.lastName },
            { label: 'Personal ID', value: customer.personalId },
            { label: 'Birth Date', value: customer.birthDate },
            { label: 'Address', value: customer.address },
            { label: 'City', value: customer.city },
            { label: 'Country', value: customer.country },
            { label: 'Zip Code', value: customer.zipCode },
            { label: 'Phone', value: customer.phoneNumber },
          ].map(({ label, value }) => (
            <div key={label} className="w-full h-13 px-6 py-6 bg-white rounded-md shadow">
              <p className="font-poppins text-black text-16 font-normal">
                {label}: {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
