import { combineReducers } from "redux";
import vehicleReducer from "./vehicleReducer";

const rootReducer = combineReducers({
    vehicleReducer, 
});

export default rootReducer;
