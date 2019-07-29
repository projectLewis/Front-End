import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const newUser = { username, password };
  const [user, setUser] = useState(null);

  function handleRegister(e) {
    e.preventDefault();
    setUser({ username, password });
  }

  useEffect(() => {
    if (user) {
      axios
        .post("https://better-reads-db.herokuapp.com/api/auth/login", user)
        .then(res => {
          console.log("login successful, res is:", res);
          localStorage.setItem("token", res.data.token);
          setUsername("");
          setPassword("");
        })
        .then(res => props.history.push("/"))
        .catch(err => console.log(err));
    }
  }, [props.history, user]);

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          name="username"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          name="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

Login.propTypes = {};

export default Login;
