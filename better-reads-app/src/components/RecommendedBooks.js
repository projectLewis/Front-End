import React from "react";
import Book from "./Book";

function RecommendedBooks({ recommendedBooks }) {
  return (
    <>
       {recommendedBooks.map(book=><Book book={book}/>)}
    </>
  );
}

RecommendedBooks.propTypes = {};

export default RecommendedBooks;
