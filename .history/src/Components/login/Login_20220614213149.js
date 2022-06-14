import React from"react";
import "./login.css";


export default ({  toggleState }) => {
  const handleLogins = async (event) => {
    event.preventDefault();
    const { username, password } = event.target;
    const reqBody = {
      ...(username.value && { username: username.value }),
      ...(password.value && { password: password.value }),
    };

    await fetch(`http://127.0.0.1:5400/auth/login`, {
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: reqBody ? JSON.stringify(reqBody) : undefined,
    })
      .then((data) => data.json())
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("auth", response.token);
        } else alert("Erorro herer")
      })
      .catch((error) => {
        alert("Error ss")
      });

    localStorage.setItem("token", JSON.stringify({ ...token, logged: true }));
  };
  return (
    <div class="login-box">
      <h2>Login</h2>
      <form onSubmit={handleLogins}>
        <div class="user-box">
          <input
            type="text"
            name="username"
            required
            onChange={(e) => console.log(e.target.value)}
          />
          <label>Username</label>
        </div>
        <div class="user-box">
          <input
            type="password"
            name="password"
            required
            onChange={(e) => console.log(e.target.value)}
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


