import React from"react";
import "./login.css";


export default ({ handleLogin }) => {
  const handleLogins = (e) => {
   e.preventDefault();  

    console.log("Cscs");
   handleLogin;
 }
  return (
      <div class="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogins}>
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

        <button className="btn "
        type="submit">
            
            Submit
          </button>
        </form>
      </div>
    );
  }


