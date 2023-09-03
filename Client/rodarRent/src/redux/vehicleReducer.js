import { GET_VEHICLE } from "./constants";

const initialState = {
  vehicles: [],
  aux: [],
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_VEHICLE:
      if (action.payload.error) {
        return {
          ...state,
          error: action.payload.error,
        };
      }
      return {
        ...state,
        vehicles: action.payload,
        aux: action.payload,
        error: null,
      };
    default:
      return state;
  }
}

export default reducer;
