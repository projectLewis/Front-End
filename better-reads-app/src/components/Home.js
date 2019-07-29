import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import RecommendedBooks from "./RecommendedBooks";

function Home(props) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
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
          // do a setRecommendedBooks call once we've figured out what we're getting back from the request
          setSearchTerm("");
        })
        .catch(err => console.log(err));
    }
  }, [searchTerm]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="description"
          placeholder="Search.."
          value={searchInput}
          onChange={handleChanges}
        />
        <button>Search</button>
      </form>
      {recommendedBooks.length === 0 ? (
        <RecommendedBooks />
      ) : (
        <div>Search something!</div>
      )}
    </div>
  );
}

Home.propTypes = {};

export default Home;
