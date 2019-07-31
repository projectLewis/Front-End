import React,{useState} from "react";
import {
  Card,
  Image,
  Container,
  Modal,
  Button,
} from "semantic-ui-react";
import BookModal from "./BookModal";

function Book({ book }) {
  // think about what to do for images that don't exist as they are truthy

  const [isModalOpen, setModalOpen] = useState(false)
  function openModal(){
    setModalOpen(true)
  }
  function closeModal(){
    setModalOpen(false)
  }
  return (


    <Container >
      {/* <Modal trigger={
      <BookModal />} > */}
      <Card onClick={openModal} centered style={{ margin: "30px auto" }}>
        <Image style={{ width: "100%" }} src={`${book.image}`} />
        <Card.Content>
          <Card.Header>{book.title}</Card.Header>
          <Card.Meta>{book.author}</Card.Meta>
        </Card.Content>
      </Card>

      {/* </Modal> */}
      <Modal size={'medium'} open={isModalOpen} onClose={closeModal}>
        <Modal.Header>More info</Modal.Header>
        <Modal.Content>
            <BookModal isbn={book.isbn} />
        </Modal.Content>
        <Modal.Actions>
            <Button negative onClick={closeModal}>Close</Button>
        </Modal.Actions>
      </Modal>
    </Container>

  );
}

Book.propTypes = {};

export default Book;
