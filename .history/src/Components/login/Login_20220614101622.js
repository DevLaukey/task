import React, { useState } from"react";
import "./login.css";
import PropTypes from "prop-types";


export default ({ handleLogin }) => {
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()
  return (
      <div class="login-box">
        <h2>Login</h2>
        <form onSubmit={()=> handleLogin(true)}>
          <div class="user-box">
            <input
              type="text"
              name=""
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              name=""
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <btn href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </btn>
        </form>
      </div>
    );
  }


