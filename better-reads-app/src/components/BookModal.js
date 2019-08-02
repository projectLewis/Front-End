import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Header, Dimmer, Loader, Icon } from "semantic-ui-react";

const BookModal = ({ isbn }) => {
  const [book, addBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isbn) {
      Axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      ).then(data => {
        console.log(data);
        addBook(data.data.items[0].volumeInfo);
        setIsLoading(false);
      });
    }
  }, [isbn]);

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

      <a href={book.previewLink}
        style={{ display: "table-cell" }}
        target="_blank">
        <Icon className="google" color="blue" />
      </a>

      <a href="https://goodreads.com"
      style={{ display: "table-cell" }}
      target="_blank">
        <Icon className="goodreads g" color="light-brown" />
      </a>

      <a href="https://amazon.com"
      style={{ display: "table-cell" }}
      target="_blank">
        <Icon className="amazon" color="orange" />
      </a>
    </>
  );
};

export default BookModal;
