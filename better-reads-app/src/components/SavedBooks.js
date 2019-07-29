import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";

function SavedBooks(props) {
  const [savedBooks, setSavedBooks] = useState([]);
  useEffect(() => {
      Axios.get(`url here/${id}`)
        // set savedBooks to the array we get back..
          .then(res => {
              console.log(res)
            //   setSavedBooks(res.data)
          })
        .catch(err => console.log(err));
  }, [savedBooks]);
  return <div />;
}

SavedBooks.propTypes = {};

export default SavedBooks;
