import {configureStore} from '@reduxjs/toolkit';
import authenticationReducer from './authenticationSlice.js';

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer
    }
});
