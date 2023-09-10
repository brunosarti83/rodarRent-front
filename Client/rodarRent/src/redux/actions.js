import axios from "axios";
import { GET_VEHICLE, SET_FILTERS, GET_CUSTOMERBYID, GET_CUSTOMERS, GET_ALLBOOKINGS, LOGIN, LOGOUT  } from "./constants";
import queryMaker from "../helpers/queryMaker";
import { setSessionStorage, getLocalStorage } from "../helpers/storage";
import { successLogin, logOutSession } from '../helpers/Log';
import {toast} from 'react-toastify';


export function getVehicle(filterObject) {
  const queryString = queryMaker(filterObject)
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/vehicles/" + queryString)
      .then((response) => {
        dispatch({
          type: GET_VEHICLE,
          payload: response.data,
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

export function getAvailability(queryObject){
  const queryString = queryMaker(queryObject)
  return async function(dispatch){
      try {
        const response = await axios.get(`http://localhost:3001/available/`+ queryString)
        dispatch({
          type: GET_VEHICLE,
          payload: response.data
        })
      } catch (error) {
        console.log(error)
      }
  }
}

export function setFilters(filterObject){
  try {
    setSessionStorage('filterObject', filterObject)
    return {
      type: SET_FILTERS,
      payload: filterObject
    }
  } catch (error) {
    return {
      type: SET_FILTERS,
      payload: { error: error.message }
    }
  }
}

export const logIn = (loginData,navigate) => async (dispatch) =>{
    try {
      const response = await axios.post('http://localhost:3001/customers/login',loginData);
      if (response.status===200) {
        successLogin(response.data,navigate)
        const loginData = getLocalStorage('loginData')
        dispatch({
          type:LOGIN,
          payload: loginData
        })
      } else {
        toast.error('Invalid login credentials', {position: "top-left"});
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Error during login:', error);
    }
}

export const rememberLogin = () =>{
  const loginData = getLocalStorage('loginData')
  return {
    type: LOGIN,
    payload:loginData
  };
}

export const logOut = (navigate) => async(dispatch) =>{
  try {
    dispatch({
      type:LOGOUT
    })
    logOutSession(navigate)
  } catch (error) {
    alert('Error during Logout:', error)
  }
}
