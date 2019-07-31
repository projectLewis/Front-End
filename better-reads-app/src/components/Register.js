import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Input} from 'semantic-ui-react';

function Register({history}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const newUser = { username, password };
  const [newUser, setNewUser] = useState(null);

  function handleRegister(e) {
    e.preventDefault();
    setNewUser({ username, password });
  }

  useEffect(() => {
    if (newUser) {
      axios
        .post(
          "https://better-reads-db.herokuapp.com/api/auth/register",
          newUser,
        )
        .then(res => {
          console.log("res", res);
          setUsername("");
          setPassword("");
        })
        .then(history.push("/login"))
        .catch(err => console.log(err));
    }
  }, [newUser, history]);

  return (
    <div>
      <form className="form" onSubmit={handleRegister}>
        <Input className="input"
          name="username"
          placeholder="username"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <Input className="input"
          name="password"
          placeholder="password"
          type="password"
          required
          minLength="8"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button>Register</Button>
        <div>Already have an Account? 
          <Link to="/login"> Login</Link>
        </div>
      </form>
    </div>
  );
}

Register.propTypes = {};

export default Register;
