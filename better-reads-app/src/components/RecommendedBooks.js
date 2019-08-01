import React from "react";
import Book from "./Book";

function RecommendedBooks({
  recommendedBooks,
  savedBookList,
  setSavedBookList,
}) {
  console.log(recommendedBooks);
  return (
    <div
      className="bookFlexWrapper"
      style={{
        display: "flex",
        flexWrap: "wrap",
        margin: "40px auto",
        maxWidth: "1000px",
        padding: "0 20px",
        justifyContent: "center",
      }}>
      {recommendedBooks.map(book => (
        <Book
          book={book}
          savedBookList={savedBookList}
          setSavedBookList={setSavedBookList}
        />
      ))}
    </div>
  );
}

export default RecommendedBooks;
