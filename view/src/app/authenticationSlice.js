import {createSlice} from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        isLoggedIn: false,
        user: {}
    },
    reducers: {
        login (state, action) {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout (state, action) {
            state.isLoggedIn = false;
            state.user = {};
        }
    }
})

export const {login, logout} = authenticationSlice.actions;

export default authenticationSlice.reducer;
