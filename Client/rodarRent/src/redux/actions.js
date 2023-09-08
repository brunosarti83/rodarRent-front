import axios from "axios";
import { GET_VEHICLE, GET_CUSTOMERBYID, GET_CUSTOMERS, GET_ALLBOOKINGS } from "./constants";


export function getVehicle() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/vehicles/")
      .then((response) => {
        dispatch({
          type: GET_VEHICLE,
          payload: response.data.results,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_VEHICLE,
          payload: { error: error.message },
        });
      });
  };
}
// export function getVehicleById() {
//   return function (dispatch) {
//     return axios
//       .get("http://localhost:3001/vehicles/:id")
//       .then((response) => {
//         dispatch({
//           type: GET_VEHICLE,
//           payload: response.data,
//         });
//       })
//       .catch((error) => {
//         dispatch({
//           type: GET_VEHICLE,
//           payload: { error: error.message }, 
//         });
//       });
//   };
// }
export function getAvaiability(search) {
  const { pickUp, dropOff } = search
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/available?startDate=${pickUp}&finishDate=${dropOff}`)
      dispatch({
        type: GET_VEHICLE,
        payload: response.data.results
      })
    } catch (error) {
      alert(error)
    }
  }
}

export function getAllCustomers() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/customers/")
      .then((response) => {
        dispatch({
          type: GET_CUSTOMERS,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_CUSTOMERS,
          payload: { error: error.message },
        });
      });
  };
}

export function getCustomerById() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/customers/:id/")
      .then((response) => {
        dispatch({
          type: GET_CUSTOMERBYID,
          payload: response.results
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_CUSTOMERBYID,
          payload: { error: error.message },
        });
      });
  };
}

export function getAllBookings() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/bookings/")
      .then((response) => {
        dispatch({
          type: GET_ALLBOOKINGS,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ALLBOOKINGS,
          payload: { error: error.message },
        });
      });
  };
}
