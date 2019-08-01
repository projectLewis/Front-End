import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Header, Dimmer, Loader } from "semantic-ui-react";

const BookModal = ({ ISBN }) => {
  const [book, addBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (ISBN) {
      Axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}`,
      ).then(data => {
        addBook(data.data.items[0].volumeInfo);
        setIsLoading(false);
      });
    }
  }, [ISBN]);

  return isLoading ? (
    <Dimmer inverted active>
      <Loader inverted> Loading </Loader>
    </Dimmer>
  ) : (
    <>
      <Header>
        {book.title} <Header sub>{book.authors}</Header>{" "}
      </Header>
      <h5>Description: </h5>
      <p>{book.description}</p>
      <p>{book.pageCount} pages</p>
      {book.averageRating ? <p>Rating: {book.averageRating}/5</p> : null}
      <a
        style={{ display: "table-cell" }}
        target="_blank"
        href={book.previewLink}>
        View in Google Books >
      </a>
    </>
  );
};

export default BookModal;
