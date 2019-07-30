import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { Button } from 'semantic-ui-react';

import axios from "axios";

function Home(props) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    setSearchTerm(searchInput);
  }
  function handleChanges(e) {
    setSearchInput(e.target.value);
  }
  useEffect(() => {
    if (searchTerm) {
      axios
        .get("insert url here", searchTerm)
        .then(res => {
          console.log("get search request successful, res is:", res);
          setSearchTerm("");
        })
        .catch(err => console.log(err));
    }
  }, [searchTerm]);
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input"
          name="description"
          placeholder="Search.."
          value={searchInput}
          onChange={handleChanges}
        />
        <button>Search</button>
        <div>
          <input type="radio" name="search" value="description"
         checked />
          <label for="description">Description</label>
        </div>

        <div>
          <input type="radio" name="search" value="author" />
          <label for="author">Author</label>
        </div>
      </form>
    </div>
  );
}

Home.propTypes = {};

export default Home;

