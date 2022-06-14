import React from"react";
import "./login.css";
import { create_context } from "../../context/index";


export default ({ toggleState }) => {
  const { loginFunc } = React.useContext(create_context)
  const handleLogins = async (event) => {
    event.preventDefault();
    const { email , password } = event.target;
    const reqBody = {
      ...email.value && { email: email.value },
      ...password.value && { password: password.value },
    };

    await fetch(`https://auth-blog.herokuapp.com/auth/login`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: reqBody ? JSON.stringify(reqBody) : undefined,
    })
      .then((data) => data.json())
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("auth", response.token);
          loginFunc(response.token);
        } else console.log("error");
      })
      .catch((error) => {
        console.log(error);
      });

  };
  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleLogins}>
        <div className="user-box">
          <input
            type="text"
            name="email"
            required
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            required
          />
          <label>Password</label>
        </div>

        <button className="btn " type="submit">
          Submit
        </button>
        <p>To login in use : <br />
          <span>Email</span> testuser@gmail.com <br />
<span>Password</span>testuser
        </p>
      </form>
    </div>
  );
};


