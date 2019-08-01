import React, { useState, useEffect } from "react";
import { Card, Image, Container, Modal, Button, Icon } from "semantic-ui-react";
import BookModal from "./BookModal";

import { axiosWithAuth } from "../functions/authorization.js";

function Book({ book, savedBookList, setSavedBookList }) {
  // think about what to do for images that don't exist as they are truthy
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookToSave, setBookToSave] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(false);
  const [liked, setLiked] = useState(false);

  function toggleClick() {
    setLiked(!liked);
  }

  const userId = localStorage.getItem("user_id");

  // useEffect(() => {
  //   if (bookToSave) {
  //     axiosWithAuth()
  //       .post(
  //         `https://better-reads-db.herokuapp.com/api/books/save/${userId}`,
  //         bookToSave,
  //       )
  //       .then(res => {
  //         console.log(res);
  //         setSavedBookList(res.data);
  //       })
  //       .catch(res => console.log(res));
  //   }
  // }, [bookToSave, setSavedBookList, userId]);

  useEffect(() => {
    if (bookToDelete) {
      axiosWithAuth()
        .delete(
          `https://better-reads-db.herokuapp.com/api/books/save/${userId}`,
          bookToDelete,
        )
        .then(res => {
          console.log(res);
          setSavedBookList(res.data);
        })
        .catch(res => console.log(res));
    }
  }, [bookToDelete, setSavedBookList, userId]);

  function addToSavedList() {
    console.log("book's title", book.title);

    setBookToSave(
      prevBook =>
        (prevBook = {
          title: book.title,
          author: book.author,
          isbn: book.isbn,
        }),
    );
    console.log("bookToSave", bookToSave);
  }

  function deleteFromSavedList() {
    setBookToDelete(book.id);
  }

  function openModal() {
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
  }
  return (
    <Container style={{ width: "auto", marginBottom: "20px" }}>
      {/* <Modal trigger={
      <BookModal />} > */}
      <Card centered>
        <Image
          style={{ height: "350px", width: "100%" }}
          src={`"https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg"`}
          onClick={openModal}
        />
        <Card.Content style={{ maxHeight: "300px" }}>
          <Card.Header onClick={openModal}>{book.title}</Card.Header>
          <Card.Meta onClick={openModal}>{book.author}</Card.Meta>
          {/* {savedBookList.find(savedBook => savedBook.isbn === book.isbn) ? (
            <Icon className="heart" onClick={deleteFromSavedList} />
          ) : (
            <Icon className="heart outline" onClick={addToSavedList} />
          )} */}
          {liked ? (
            <Icon className="heart" onClick={addToSavedList} />
          ) : (
            <Icon className="heart outline" onClick={addToSavedList} />
          )}
        </Card.Content>
      </Card>

      {/* </Modal> */}
      <Modal size={"medium"} open={isModalOpen} onClose={closeModal}>
        <Modal.Header>More info</Modal.Header>
        <Modal.Content>
          <BookModal isbn={book.isbn} />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={closeModal}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
}

Book.propTypes = {};

export default Book;
