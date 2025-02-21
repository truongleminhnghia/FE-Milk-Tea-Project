import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLogged: false,
    },
    reducers: {
        login: (state, actions) => {
            state.user = actions.payload;
            state.isLogged = true;
        },
        logout: (state, actions) => {
            state.user = null;
            state.isLogged = false;

        }
    }
});

export const {login, logout} = authSlice.actions;
export const selectUser = (store) => store.user.user;
export default authSlice.reducer;