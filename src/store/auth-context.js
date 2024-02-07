import React, { useState } from 'react';


const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
  });

 export const AuthContextProvider =(props) => {
 const initialToken = localStorage.getItem('token')   
 const [token, setToken] = useState(initialToken)

 const userIsLoggedIn = !!token;

 const loginHandler =(token) => {
   
    setToken(token, setTimeout(() => {
      localStorage.removeItem('token');
      setToken(null);
    }, 30000));

    localStorage.setItem('token', token)
 }
 const logoutHandler =() => {
    setToken(null);
    localStorage.removeItem('token')
 }

 const contextValue = {
   token: token,
   isLoggedIn: userIsLoggedIn,
   login: loginHandler,
   logout: logoutHandler,  
 }; 

 return (
  <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>  
 )
};                                 

  export default AuthContext;