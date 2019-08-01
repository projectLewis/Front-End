import React, { useState, useEffect } from "react";
import Book from "./Book.js";
import Axios from "axios";

function SavedBooks({savedBookList, setSavedBookList}) {
  const [savedBooks, setSavedBooks] = useState([]);
  const userId = localStorage.getItem("user_id");
  useEffect(() => {
    Axios.get(`https://better-reads-db.herokuapp.com/api/users/list/${userId}`)
      // set savedBooks to the array we get back..
      .then(res => {
        console.log(res);
        setSavedBooks(res.data);
      })
      .catch(err => console.log(err));
  }, [userId]);

  return (
    <div>
      {savedBooks.map(savedBook => (
        <Book 
          book={savedBook}
          savedBookList={savedBookList}
          setSavedBookList={setSavedBookList}
          />
      ))}
    </div>
  );
}

export default SavedBooks;
