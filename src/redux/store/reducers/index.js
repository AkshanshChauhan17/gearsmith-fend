import { combineReducers } from "redux";
import productReducer from './productReducer';
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
    product: productReducer,
    is_login: loginReducer,
});

export default rootReducer;