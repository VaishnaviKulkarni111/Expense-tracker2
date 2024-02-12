import { useContext, useRef, useState } from "react";
import {useDispatch}  from 'react-redux'
import classes from "./Auth.module.css";
import { authActions } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
 
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    const urlF =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD4V11PNolpKhtXgURPq9zel2py2kUt5Sw";
    const enteredEmail = emailRef.current.value;
    try {
      const response = await fetch(urlF, {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      setIsLoading(false); 
      if(response.ok){
        console.log('request sent successfully')
        return response.json();
       
    }else {
        if (response.error && response.error.message === 'RESET_PASSWORD_EXCEED_LIMIT') {
            console.log('Password reset limit exceeded. Please try again later.');
          }else 
        return response.json().then((data)=> {
            let errorMsg = 'Error sending password reset email'
            console.log(data);
            throw new Error(errorMsg);
        });
    }  
    } 
    catch (err) {
      console.log(err);
    }
  };

  const submitHandler =async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setIsLoading(true);
    let url;
    if (!isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4V11PNolpKhtXgURPq9zel2py2kUt5Sw";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4V11PNolpKhtXgURPq9zel2py2kUt5Sw";
    }
    try{
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-type": "application/json" },
      })
      const data = await res.json();
          setIsLoading(false);
          if (!res.ok) {
            throw new Error(data.error?.message || "Authentication failed");
          }
        
        dispatch(authActions.login({idToken: data.idToken, email: data.email}))
        console.log(data.email);
          navigate("/exp");

       setIsLoading(false);
    }catch(err){
        alert(err.message);
      };

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <>
      <section className={classes.auth}>
        <h1>{isLogin ? "Sign Up" : "Login"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" required ref={passwordRef} />
          </div>

          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Create Account" : "Login"}</button>
            )}
            {isLoading && <p>Sending Request...</p>}
          </div>
          {!isLogin && (
            <button
              className={classes.forgotBtn}
              onClick={forgotPasswordHandler}
            >
              Forgot Password
            </button>
          )}
          <div>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {!isLogin ? "Create new account" : "Have an Account? Login!"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default AuthPage;
