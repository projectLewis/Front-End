import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Nav(props) {
  return (
    <div>
      
        <nav>
          {localStorage.getItem("token") && (<div><Link to="/login">Login</Link>
          <Link to="/register">Register</Link></div>)}
          <Link to="/">Search</Link>
        </nav>
    </div>
  );
}

Nav.propTypes = {};

export default Nav;
