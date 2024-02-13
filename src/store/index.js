import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './AuthSlice';
import themeReducer from './themeSlice'
const storedIdToken = localStorage.getItem("idToken");
const storedEmail=localStorage.getItem("email");
const storedTheme = localStorage.getItem("theme");

const store = configureStore({
   reducer:{
    auth: AuthReducer,
    theme: themeReducer
   },
   preloadedState: {
      auth: {
        idToken: storedIdToken || null,
        isAuthenticated: !!storedIdToken,
        email:storedEmail || null,
      },
      theme: {
         isDark: storedTheme === "dark", 
       },
     },   
})

export default store