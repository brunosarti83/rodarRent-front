import { GET_CUSTOMERS } from "../constants";

const initialState = {
  customers: [],
  aux: [],
  error: null,
};

function customerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_CUSTOMERS:
      if (payload.error) {
        return {
          ...state,
          error: payload.error,
        };
      }
      return {
        ...state,
        customers: payload,
        aux: payload,
        error: null,
      };
    default:
      return state;
  }
}

export default customerReducer;
