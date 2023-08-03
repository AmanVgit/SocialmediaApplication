import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/AuthAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {

  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };

  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState(initialState);
  const [confirmPass, setConfirmPass] = useState(true);
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //handle change on toggle of sigin,signup
  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    resetForm()
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(true);
  };


  return (
    <div className="Auth">

      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>SocialStar</h1>
          <h6>Explore the unexplored world</h6>
        </div>
      </div>

      {/* right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>

          {isSignUp &&
            (<div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>)}


          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                value={data.confirmpass}
                onChange={handleChange}
              />
            )}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>

          <div>
            <span style={{ fontSize: '12px' }}>
              {!isSignUp ? (
                <span>
                  Don't have an account?{' '}
                  <span
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={handleToggle}
                    onMouseOver={{ backgroundColor: '#f1f1f1' }}
                    onMouseOut={{ backgroundColor: 'transparent' }}
                  >
                    SignUp
                  </span>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <span
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={handleToggle}
                    onMouseOver={{ backgroundColor: '#f1f1f1' }}
                    onMouseOut={{ backgroundColor: 'transparent' }}
                  >
                    Login!
                  </span>
                </span>
              )}
            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={loading}>
          {loading? "Loading..." : isSignUp ? "Sign Up" : "Log In"}</button>
        </form>
      </div>
    </div>
  );
};

export default Auth;