import { getSessionStorage } from "../../helpers/storage";
import { GET_VEHICLE, SET_FILTERS } from "../constants";


const filterObject = getSessionStorage('filterObject')

const initialState = {
  vehicles: {},
  filterObject: filterObject || { limit: 6, orderBy: 'pricePerDay', direction: 'DESC' },
  error: null,
};

function reducer(state = initialState, {type,payload}) {
  switch (type) {
    case GET_VEHICLE:
      if (payload.error) {
        return {
          ...state,
          error:payload.error,
        };
      }
      return {
        ...state,
        vehicles:payload,
        error: null,
      };
    case SET_FILTERS:
      if (payload.error) {
        return {
          ...state,
          error:payload.error,
        };
      }
      return {
        ...state,
        filterObject:payload,
        error: null,
      };
    default:
      return state;
  }
}

export default reducer;
