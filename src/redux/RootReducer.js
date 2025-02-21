import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/authSlice";

const rootReducer = combineReducers({
    user: counterReducer,
});

export default rootReducer;
