import React from "react";
import "./login.css"
import PropTypes from "prop-types";

function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  return (
    <div class="login-box">
      <h2>Login</h2>
      <form>
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
        <a href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
      </form>
    </div>
  );
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}