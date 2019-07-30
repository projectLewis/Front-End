import React from "react";
import {
  Card,
  Image,
  Container,
  Modal,
  Button,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookModal from "./BookModal";

function Book({ book }) {
  // think about what to do for images that don't exist as they are truthy
  return (
    <Link to={`/book/${book.isbn}`}>
      <Container>
        {/* <Modal trigger={
        <BookModal />} > */}
        <Card centered style={{ margin: "30px auto" }}>
          <Image style={{ width: "100%" }} src={`${book.image}`} />
          <Card.Content>
            <Card.Header>{book.title}</Card.Header>
            <Card.Meta>{book.author}</Card.Meta>
          </Card.Content>
        </Card>

        {/* </Modal> */}
      </Container>
    </Link>
  );
}

Book.propTypes = {};

export default Book;
