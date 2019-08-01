import React, { useState } from "react";
import { Card, Image, Container, Modal, Button, Icon } from "semantic-ui-react";
import BookModal from "./BookModal";

// import {axiosWithAuth} from "../functions/authorization.js";

function Book({ book }) {
  // think about what to do for images that don't exist as they are truthy

  const [isModalOpen, setModalOpen] = useState(false);

  // function addToSavedList(book) {
  //   const userId = localStorage.getItem("user_id")
  //   axiosWithAuth()
  //     .post(`https://better-reads-db.herokuapp.com/api/books/save/${userId}`)
  //     .then(res => console.log(res))
  //     .catch(res => console.log(res));
  // }

  function openModal() {
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
  }
  return (
    <Container style={{width: 'auto', marginBottom: '20px'}} >
      {/* <Modal trigger={
      <BookModal />} > */}
      <Card onClick={openModal} centered>
        <Image style={{ height: '350px', width: "100%" }} src={`${book.image}?default=false`} onError={(e)=>{e.target.onerror = null; e.target.src=require("../imgs/cover_not_found.png") }}/>
        <Card.Content style={{maxHeight:'300px'}}>
          <Card.Header>{book.title}</Card.Header>
          <Card.Meta>{book.author}</Card.Meta>
          {}
          <Icon className="heart" />
          <Icon className="heart outline" />
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
