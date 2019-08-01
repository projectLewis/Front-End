import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

function Nav(props) {
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  }

  return (
    <div>
      <nav>
        <Link to="/login">
          <Button className="button-nav">Login</Button>
        </Link>
        <Link to="/register">
          <Button className="button-nav">Sign up</Button>
        </Link>
        <Link to="/">
          <Button className="button-nav">Search Books</Button>
        </Link>
        {localStorage.getItem("token") && (
          <Link to="/saved_books">
            <Button className="button-nav">Saved Books</Button>
            <Button className="button-nav" onClick={logout}>
              Logout
            </Button>
          </Link>
        )}
      </nav>
    </div>
  );
}
Nav.propTypes = {};
export default Nav;
