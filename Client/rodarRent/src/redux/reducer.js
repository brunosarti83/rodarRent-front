import axios from "axios";
import { GET_VEHICLE } from "./constants";

export function getVehicle() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/vehicles/")
      .then((response) => {
        dispatch({
          type: GET_VEHICLE,
          payload: response.data,
        });
      })
      .catch((error) => {
        // En caso de error, puedes enviar un objeto con la propiedad 'error'
        dispatch({
          type: GET_VEHICLE,
          payload: { error: error.message },
        });
      });
  };
}
