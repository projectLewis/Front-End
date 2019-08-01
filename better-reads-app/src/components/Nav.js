import React from "react";
import { Link } from "react-router-dom";
import { Button, Image } from 'semantic-ui-react';
function Nav(props) {
  return (
    <nav className="navigation">
      <div>
        <div className="logo">
          <Image className="logo__img" alt="betterreads logo" src={require("../imgs/logo_transparent.png")} />
        </div>
      </div>

      <div className="nav-links">
      <Link to="/register"> Register</Link>
      <Link to="/login"> Login</Link>
      <Link to="/search"> Search</Link>
      </div>
    </nav>
  );
}
Nav.propTypes = {};
export default Nav;
