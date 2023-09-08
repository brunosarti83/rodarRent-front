import { combineReducers } from "redux";
import vehicleReducer from "./vehicleReducer";

const rootReducer = combineReducers({
    veh: vehicleReducer, 
});

export default rootReducer;
