import axios from "axios";
import { GET_VEHICLE, SET_FILTERS } from "./constants";
import queryMaker from "../helpers/queryMaker";
import { setSessionStorage } from "../helpers/storage";

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
export function getVehicleById() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3001/vehicles/:id")
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
        alert(error)
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