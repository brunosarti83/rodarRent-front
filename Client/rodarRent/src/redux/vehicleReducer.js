import { GET_VEHICLE } from "./constants";

const initialState = {
  vehicles: [],
  aux: [],
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
        aux:payload,
        error: null,
      };
    default:
      return state;
  }
}

export default reducer;
