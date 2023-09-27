import axios from "axios";
import { GET_VEHICLE, SET_FILTERS, GET_CUSTOMERBYID, GET_CUSTOMERS, GET_ALLBOOKINGS, LOGIN, LOGOUT  } from "./constants";
import queryMaker from "../helpers/queryMaker";
import { setSessionStorage, getLocalStorage } from "../helpers/storage";
import { successLogin, logOutSession } from '../helpers/Log';
import {toast} from 'react-toastify';
import { API_BASE_URL } from '../helpers/routes';


export function getVehicle(filterObject) {
  const queryString = queryMaker(filterObject)
  return function (dispatch) {
    return axios
      .get(`${API_BASE_URL}/vehicles/` + queryString)
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

export function getAllCustomers() {
  return function (dispatch) {
    return axios
      .get(`${API_BASE_URL}/customers`)
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
      .get(`${API_BASE_URL}/customers/:id/`)
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
      .get(`${API_BASE_URL}/bookings/`)
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
        const response = await axios.get(`${API_BASE_URL}/available/`+ queryString)
        dispatch({
          type: GET_VEHICLE,
          payload: response.data
        })
      } catch (error) {
        dispatch({
          type: GET_VEHICLE,
          payload: { error: error.message },
        });
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
      const response = await axios.post(`${API_BASE_URL}/customers/login`,loginData);
      if (response.status===200) {
        successLogin(response.data,navigate)
        dispatch({
          type:LOGIN,
          payload: response.data
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

//? ADMIN VEHICLES ACTIONS

export const getVehicleAdmin = (pageObject) =>{
  const queryString = queryMaker(pageObject)
  return async function(dispatch){
    try {
      const response = await axios.get(`${API_BASE_URL}/vehicles`+ queryString)
      dispatch({
        type:GET_VEHICLE,
        payload: response
      })
    } catch (error) {
      alert(error)
    }
  }
}