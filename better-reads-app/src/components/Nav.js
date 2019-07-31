import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react';

function Nav(props) {
  return (
  <div>
    <nav>
        <Link to="/login">
          <Button className="button-nav" type="login">
          Login
          </Button>
        </Link>
        <Link to="/register">
          <Button className="button-nav" type="register">
            Sign up
          </Button>
        </Link>
        <Link to="/">
          <Button className="button-nav" type="search">
            Search Books
          </Button>
        </Link>



    </nav>
  </div>

  );
}

Nav.propTypes = {};

export default Nav;
