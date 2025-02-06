import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            token: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload.user;
            state.login.token = action.payload.token;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        logout: (state) => {
            state.login.currentUser = null;
            state.login.token = null;
        }
    }
});

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    logout
} = authSlice.actions;

export default authSlice.reducer;