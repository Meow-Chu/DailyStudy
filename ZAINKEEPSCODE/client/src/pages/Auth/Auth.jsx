import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";

function Auth() {
  const { isSignUp, setIsSignUp } = useState(false);
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
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="password"
              placeholder="Password"
            />

            {isSignUp && (
              <input
                type="text"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm password"
              />
            )}
          </div>

          <div>
            <span style={{ fontSize: "12px" }}>
              Already have an account. Login!
            </span>
          </div>
          <button className="button infoButton" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;

/** 삭제한부분
 function LogIn() {
  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <h3>Log In</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Username"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="password"
            placeholder="Password"
          />
        </div>

        <div>
          <span style={{ fontSize: "12px" }}>
            Don't have an account Sign up
          </span>

          <button className="button infoButton" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

function SignUp() {
  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <h3>Sign up</h3>

        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Usernames"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="password"
            placeholder="Password"
          />

          <input
            type="text"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm password"
          />
        </div>

        <div>
          <span style={{ fontSize: "12px" }}>
            Already have an account. Login!
          </span>
        </div>
        <button className="button infoButton" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

 */
