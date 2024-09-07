import React, { useState, useEffect, useCallback } from "react";
import "./LoginModel.css";
import { RxCross2 } from "react-icons/rx";
import supabase from "../../supabase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../slices/userSlice";

const LoginModel = ({ isopen, setClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const session = supabase.auth.session();
    if (session?.user) {
      dispatch(setUser(session.user));
      setClose(false);
    }
  }, [dispatch, setClose]);

  const handleError = (error) => {
    console.error("Supabase Error:", error);
    if (error.message.includes("rate limit")) {
      setError("Too many requests. Please wait and try again.");
    } else if (error.message.includes("Invalid login credentials")) {
      setError("Invalid email or password. Please try again.");
    } else {
      setError("An error occurred. Please try again later.");
    }
    setIsSubmitting(false);
  };

  const signup = useCallback(async () => {
    setError("");
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        handleError(error);
      } else if (data.user) {
        alert("Account created. Please verify your email.");
      }
    } catch (error) {
      handleError(error);
    }
  }, [email, password]);

  const login = useCallback(async () => {
    console.log("Logging in with email:", email);
    setError("");
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("Login response:", data, error);
      if (error) {
        handleError(error);
      } else if (data.user) {
        dispatch(setUser(data.user));
        setClose(false);
      }
    } catch (error) {
      handleError(error);
    }
  }, [email, password, dispatch, setClose]);

  return isopen ? (
    <div className="overlay">
      <div className="LoginModel">
        <div className="left">
          <div className="left-container">
            <p className="Login-title">Login</p>
            <p className="Login-des">
              Get access to your Orders, Wishlist, and Recommendations
            </p>
          </div>
        </div>
        <div className="right">
          <input
            type="email"
            className="Login-input"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
            disabled={isSubmitting}
          />
          <input
            type="password"
            className="Login-input"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            disabled={isSubmitting}
          />
          <p className="termsandcon">
            By continuing, you agree to Flipkart's{" "}
            <span style={{ color: "blue" }}>Terms of Use</span> and
            <span style={{ color: "blue" }}> Privacy Policy.</span>
          </p>
          {error && <p className="error-message">{error}</p>}
          {loginType ? (
            <button className="Login-btn" onClick={login} disabled={isSubmitting}>
              Login
            </button>
          ) : (
            <button className="Login-btn" onClick={signup} disabled={isSubmitting}>
              Signup
            </button>
          )}
          {loginType ? (
            <p className="Login-signup" onClick={() => setLoginType(false)}>
              New to Flipkart? Create an account
            </p>
          ) : (
            <p className="Login-signup" onClick={() => setLoginType(true)}>
              Already a user? Login to an account
            </p>
          )}
        </div>
        <div className="close" onClick={() => setClose(false)}>
          <RxCross2 />
        </div>
      </div>
    </div>
  ) : null;
};

export default LoginModel;
