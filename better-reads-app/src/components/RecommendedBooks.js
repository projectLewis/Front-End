import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

function RecommendedBooks({ recommendedBooks }) {
  console.log(recommendedBooks)
  return (
    // <div>
    //   {recommendedBooks.length === 0 ?
    //   <div>No results found..</div>
    //    : {recommendedBooks.map(book=><Book/>)}} 

    // </div>
    <div>{recommendedBooks.map(book=><Book book={book}/>)}</div>
  );
}

RecommendedBooks.propTypes = {};

export default RecommendedBooks;
