import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
    username: "",
  });

  const [confirmPass, setConfirmPass] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="Auth">
      {/* Left Side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Exploer the ideas throughout the world</h6>
        </div>
      </div>

      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm">
          <h3>{isSignUp ? "Sign up" : "Log in"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm password"
                onChange={handleChange}
              />
            )}
          </div>

          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password is not same
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => setIsSignUp((prev) => !prev)}
            >
              {isSignUp
                ? "Already have an account. Log In!"
                : "Don't have an account? Sign Up!"}
            </span>
          </div>
          <button className="button infoButton" type="submit">
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
