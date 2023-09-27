import { LOGIN,LOGOUT } from "../constants";

const initialState = {
    isLoggedIn: false,
    customer: {}
}

const authReducer = (state = initialState, {type, payload}) =>{
    switch (type) {
        case LOGIN:
            return{
                ...state,
                isLoggedIn : true,
                customer:{...payload}
            }
        case LOGOUT:
            return{
                ...state,
                isLoggedIn: false,
                customer: {}
            }
        default:
            return state
    }
}

export default authReducer