import React, { useState, useEffect } from "react";
import { Card, Image, Container, Modal, Button, Icon } from "semantic-ui-react";
import BookModal from "./BookModal";

import { axiosWithAuth } from "../functions/authorization.js";

function Book({ book, savedBookList, setSavedBookList }) {
  // think about what to do for images that don't exist as they are truthy
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookToSave, setBookToSave] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [liked, setLiked] = useState(false);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    console.log('running')
    for (let i = 0; i < savedBookList.length; i++) {
      if (savedBookList[i].isbn === book.isbn) {
        return setLiked(true)
      }
    }
    return setLiked(false)
  }, [book.isbn, savedBookList])

  useEffect(() => {
    console.log(bookToSave)
    if (bookToSave) {
      axiosWithAuth()
        .post(
          `https://better-reads-db.herokuapp.com/api/books/save/${userId}`,
          bookToSave,
        )
        .then(res => {
          console.log(res);
          setSavedBookList(res.data);
        })
        .catch(res => console.log(res));
    }
  }, [bookToSave, setSavedBookList, userId]);

  useEffect(() => {
    console.log(bookToDelete)
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
    setBookToSave({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
      });
  }

  function deleteFromSavedList() {
    setBookToDelete(
      prevBook => {
      prevBook = {data: {isbn: `${book.isbn}`}};
      console.log(prevBook)
      return prevBook});
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
        <Image onClick={openModal} style={{ height: '350px', width: "100%" }} src={`${book.image}?default=false`} onError={(e)=>{e.target.onerror = null; e.target.src=require("../imgs/cover_not_found.png") }}/>
        <Card.Content style={{ maxHeight: "300px" }}>
          <Card.Header onClick={openModal}>{book.title}</Card.Header>
          <Card.Meta onClick={openModal}>{book.author}</Card.Meta>
          {/* {savedBookList.find(savedBook => savedBook.isbn === book.isbn) ? (
            <Icon className="heart" onClick={deleteFromSavedList} />
          ) : (
            <Icon className="heart outline" onClick={addToSavedList} />
          )} */}
          {liked ? 
            <Icon className="heart" onClick={deleteFromSavedList} />
           : 
            <Icon className="heart outline" onClick={addToSavedList} />
          }
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
