import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { Input } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { ReactComponent as YourSvg } from '../imgs/undraw_book_lover_mkck.svg'

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
      <YourSvg style={{height: '400px', fill: 'red'}}/>
      <form className="form" onSubmit={handleRegister}>
        <Input className="input"
          name="username"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input className="input"
          name="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button>Login</Button>
        <div> Don't have an account yet?
          <Link to="/register"> Register</Link>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {};

export default Login;
