import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Input, Checkbox, Image } from 'semantic-ui-react';
import SkewedContainer from 'sc-react';
import axios from "axios";
import RecommendedBooks from "./RecommendedBooks";

function Home(props) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([

      {
        "title": "The Bell Jar",
        "author": "Sylvia Plath",
        "image": "https://covers.openlibrary.org/b/isbn/0061148512-M.jpg",
        "isbn": "0061148512"
      },
      {
        "title": "wordslut",
        "author": "Amanda Montell",
        "image": "https://covers.openlibrary.org/b/isbn/006286887X-M.jpg",
        "isbn": "006286887X"
      },
      {
        "title": "Normal People",
        "author": "Sally Rooney",
        "image": "https://covers.openlibrary.org/b/isbn/1984822179-M.jpg",
        "isbn": "1984822179"
      },
      {
        "title": "Feminist Theory: From Margin to Center",
        "author": "Bell Hooks",
        "image": "https://covers.openlibrary.org/b/isbn/0896086135-M.jpg",
        "isbn": "0896086135"
      }

  ]);
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
  //className = 'wrapper' style={{display: 'flex', justifyContent:'space-around', width: '80%', margin:'auto'}}
  return (
    <div>
        <div style={{display: 'flex', justifyContent:'space-around', width: '80%', margin:'auto'}}>
          <Image src={require('../imgs/undraw_reading_0re1.svg')} style={{maxHeight: '200px', width: '300px', padding: '0px' }} fluid />
          <div style={{alignSelf: 'center', fontSize: '1.4rem', width: '550px', lineHeight: '1.6em'}}><h1>Search for books</h1>Describe your perfect novel and let us find the best books for you. Or search for books by author.</div>
        </div>
      <form className="form" onSubmit={handleSubmit}>
        <Input icon='search' className="input"
          name="description"
          placeholder="Search.."
          value={searchInput}
          onChange={handleChanges}
        />
        <Button>Search</Button>

        <div>
          <Checkbox name="search" name="search" value="author" />
          <label for="author">Search by author only</label>
        </div>
      </form>
      {recommendedBooks.length === 0 ? (
        <div>Search something!</div>

      ) : (
        <RecommendedBooks recommendedBooks={recommendedBooks}/>
      )}
    </div>
  );
}

Home.propTypes = {};

export default Home;
