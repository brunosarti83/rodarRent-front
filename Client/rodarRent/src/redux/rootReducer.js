import { combineReducers } from "redux";
import vehicleReducer from "./Reducers/vehicleReducer";
import customerReducer from "./Reducers/customerReducer";
import bookingReducer from './Reducers/bookingReducer';
import authReducer from "./Reducers/authReducer";

const rootReducer = combineReducers({
    customerReducer, 
    bookingReducer,
    veh: vehicleReducer, 
    auth: authReducer
});

export default rootReducer;
