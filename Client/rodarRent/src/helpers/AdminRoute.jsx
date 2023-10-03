import React, { useState, useEffect } from "react";
import {
  getCustomerDetailsUrl,
} from '../helpers/routes';

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetch(getCustomerDetailsUrl()); // Utiliza la función getCustomerDetailsUrl para obtener la URL
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error", error);
      }
    }

    fetchUserDetails();
  }, []);

  if (user && user.UserId === 1) {
    return children;
  } else {
    return null;
  }
};

export default AdminRoute;
