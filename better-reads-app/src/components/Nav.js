import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from 'semantic-ui-react';

function Nav(props) {
  return (
    // <div>
    //     <nav>
    //       {localStorage.getItem("token") && (<div><Link to="/login">Login</Link>
    //       <Link to="/register">Register</Link></div>)}
    //       <Link to="/">Search</Link>
    //     </nav>
    // </div>

  <div>
    <nav>
      {/* {localStorage.getItem("token") && (<div><Link to="/login">Login</Link> */}
      {/* <Link to="/register">Register</Link>
      <Link to="/">Search</Link> */}

        <Button className="button-nav" type="login">
          <Link to="/login">Login</Link>
        </Button>
        <Button className="button-nav" type="register">
          <Link to="/register">Sign up</Link>
        </Button>
        <Button className="button-nav" type="search">
          <Link to="/">Search Books</Link>
        </Button>



    </nav>
  </div>

  );
}

Nav.propTypes = {};

export default Nav;
