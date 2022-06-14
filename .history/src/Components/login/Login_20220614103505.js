import React, { useState } from"react";
import "./login.css";
import PropTypes from "prop-types";


export default ({ handleLogin }) => {
 
  return (
      <div class="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div class="user-box">
            <input
              type="text"
              name=""
              required
              onChange={(e) => console.log(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              name=""
              required
              onChange={(e) => console.log(e.target.value)}
            />
            <label>Password</label>
          </div>

        <btn type="submit">
          <a>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
            </a>
          </btn>
        </form>
      </div>
    );
  }


