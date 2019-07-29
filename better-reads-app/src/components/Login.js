import React,{useState, useEffect} from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const newUser = { username, password };
  const [newUser, setNewUser] = useState(null);

  function handleRegister(e) {
    e.preventDefault();
    setNewUser({ username, password });
  }

  useEffect(() => {
    console.log("in useEffect: newUser", newUser);
    if (newUser) {
      axios
        .post(
          "https://better-reads-db.herokuapp.com/api/auth/register",
          newUser,
        )
        .then(res => console.log("res", res))
        .catch(err => console.log(err));
    }
  }, [newUser]);

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
        <button>Register</button>
      </form>
    </div>
  );
}

Login.propTypes = {};

export default Login;
