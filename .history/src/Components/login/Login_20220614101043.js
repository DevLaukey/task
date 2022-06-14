import React, { useState } from "react";
import "./login.css";
import PropTypes from "prop-types";


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  setToken = setToken.bind(this);
  render() {
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
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
