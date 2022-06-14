import React from"react";
import "./login.css";
import { create_context } from "../../context/index";


export default () => {
  const { loginFunc } = React.useContext(create_context)
  const handleLogins = async (event) => {
    event.preventDefault();
    const { email , password } = event.target;
    const reqBody = {
      ...email.value && { email: email.value },
      ...password.value && { password: password.value },
    };

    await fetch(`http://127.0.0.1:5400/auth/login`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: reqBody ? JSON.stringify(reqBody) : undefined,
    })
      .then((data) => data.json())
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          localStorage.setItem("auth", response.token);
          loginFunc(response.token)
          //toggleState('login');
        } else alert("Erorro herer")
      })
      .catch((error) => {
        console.log(error)
        alert("Error ss")
      });

    // localStorage.setItem("token", JSON.stringify({ ...token, logged: true }));
  };
  return (
    <div class="login-box">
      <h2>Login</h2>
      <form onSubmit={handleLogins}>
        <div class="user-box">
          <input
            type="text"
            name="email"
            required
            // onChange={(e) => console.log(e.target.value)}
          />
          <label>Email</label>
        </div>
        <div class="user-box">
          <input
            type="password"
            name="password"
            required
            // onChange={(e) => console.log(e.target.value)}
          />
          <label>Password</label>
        </div>

        <button className="btn " type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};


