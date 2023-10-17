import axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "./routes";

const useLocations = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/locations`)
      .then((response) => {
        setLocations(response.data);
      })
      .catch((err) => {
        window.alert(
          `An error ocurred retrieving locations from server: ${err.message}`
        );
      });
  }, []);
  return locations;
};

export default useLocations;
