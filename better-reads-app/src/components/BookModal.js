import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Header, Dimmer, Loader, Icon } from "semantic-ui-react";

const BookModal = ({ isbn }) => {
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isbn) {
      Axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      ).then(res => {
        console.log(res);
        setBook(res.data.items[0].volumeInfo);
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

      <a href={book.previewLink}>
        <Icon className="google" color="blue" />
      </a>

      <a href="https://goodreads.com">
        <Icon className="goodreads g" color="yellow" />
      </a>

      <a href="https://amazon.com">
        <Icon className="amazon" color="orange" />
      </a>
    </>
  );
};

export default BookModal;
