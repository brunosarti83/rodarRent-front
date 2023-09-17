import { GET_ALLBOOKINGS } from "../constants";

const initialState = {
  bookings: [],
  aux: [],
  error: null,
};

function bookingReducer(state = initialState, {type,payload}) {
  switch (type) {
    case GET_ALLBOOKINGS:
      if (payload.error) {
        return {
          ...state,
          error:payload.error,
        };
      }
      return {
        ...state,
        bookings:payload,
        aux:payload,
        error: null,
      };
    default:
      return state;
  }
}

export default bookingReducer;
