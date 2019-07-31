import React from "react";
import Book from "./Book";

function RecommendedBooks({ recommendedBooks }) {
  console.log(recommendedBooks)
  return (
    <>
      {recommendedBooks.length === 0 ?
      <div>No results found..</div>
       : <div>{recommendedBooks.map(book=><Book book={book}/>)}</div>} 
    </>
  );
}

RecommendedBooks.propTypes = {};

export default RecommendedBooks;
