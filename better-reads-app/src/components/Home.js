import React, { useState, useEffect } from "react";
import { Button, Input, Checkbox, Form, Image } from 'semantic-ui-react';

import styled from 'styled-components'

import axios from "axios";
import RecommendedBooks from "./RecommendedBooks";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin:2% auto;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(null);
  const [savedBookList, setSavedBookList] = useState([]);

  const [recommendedBooks, setRecommendedBooks] = useState([

      {
        "title": "The Bell Jar",
        "author": "Sylvia Plath",
        "image": "https://covers.openlibrary.org/b/isbn/0061148512-M.jpg",
        "isbn": "0061148512"
      },
      {
        "title": "Feminist Theory: From Margin to Center",
        "author": "Bell Hooks",
        "image": "https://covers.openlibrary.org/b/isbn/0896086135-M.jpg",
        "isbn": "0896086135"
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
          // setRecommendedBooks will go here
          setSearchTerm("");
        })
        .catch(err => console.log(err));
    }
  }, [searchTerm]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    axios
      .get(`https://better-reads-db.herokuapp.com/api/users/${userId}`)
      .then(res => {
        console.log("get user's savedBooks successful, res is:", res);
        setSavedBookList()
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <Wrapper>
        <Image src={require('../imgs/undraw_reading_0re1.svg')} style={{maxHeight: '200px', width: '300px', padding: '0px' }} fluid />
        <div style={{alignSelf: 'center', fontSize: '1.3rem', width: '550px', lineHeight: '1.6em'}}><h1>Search for books</h1>Describe your perfect novel and let us find the best books for you. Or search for books by author.</div>
      </Wrapper>
      <Form onSubmit={handleSubmit}>
      <Form.Field style={{padding: '3% 15% 2% 15%'}}>
        <Input icon='search'
          name="description"
          placeholder="Search.."
          value={searchInput}
          onChange={handleChanges}
        />
        </Form.Field>
        <Button>Search</Button>

        <div>
          <Checkbox name="search" value="author" style={{top:'5px', left:'-5px'}} />
          <label for="author">Search by author only</label>
        </div>
      </Form>
      {recommendedBooks.length === 0 ? (
        <div>Search something!</div>
      ) : (
        <RecommendedBooks recommendedBooks={recommendedBooks} />
      )}
    </div>
  );
}

Home.propTypes = {};

export default Home;
