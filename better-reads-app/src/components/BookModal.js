import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Header, Dimmer, Loader, Icon } from "semantic-ui-react";

const BookModal = ({ isbn }) => {
  const [book, addBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [foundStatus, setFoundStatus] = useState(null);
  useEffect(() => {
    if (isbn) {
      Axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      ).then(data => {
        console.log(data);
        addBook(data.data.items[0].volumeInfo);
        setIsLoading(false);
        setFoundStatus(true);
      }).catch(err => {
        setFoundStatus(false);
        setIsLoading(false);
        console.error(err);
      });
    }
  }, [isbn]);
  if (isLoading) {
  return  (
    <Dimmer inverted active>
      <Loader inverted> Loading </Loader>
    </Dimmer>
    )
  }
 if (isLoading === false && foundStatus === true) {
   return (
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
        <Icon className="goodreads g" color="light-brown" />
      </a>

      <a href="https://amazon.com">
        <Icon className="amazon" color="orange" />
      </a>
    </>
  );
}
if (isLoading === false && foundStatus === false) {
  return (
   <>
     <Header>
      Well this is awkward...
     </Header>
     <p>Sorry... our sales endpoint couldn't find details for this book. Please try another</p>
   </>
 );
}
};

export default BookModal;
