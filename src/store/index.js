import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './AuthSlice';

const storedIdToken = localStorage.getItem("idToken");
const storedEmail=localStorage.getItem("email");
const storedTheme = localStorage.getItem("theme");

const store = configureStore({
   reducer:{
    auth: AuthReducer,
   }
})

export default store