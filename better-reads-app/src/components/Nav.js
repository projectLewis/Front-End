import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Nav(props) {
  return (
    <div>
      {localStorage.getItem("token") && (
        <nav>
          <Link to="/saved_books" />
        </nav>
      )}
    </div>
  );
}

Nav.propTypes = {};

export default Nav;
