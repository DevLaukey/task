import React, { useState } from "react";
import "./login.css";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}


export default ({ setToken }) => {
  
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };
  return (
    <div class="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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



