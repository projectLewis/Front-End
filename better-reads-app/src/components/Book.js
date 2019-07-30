import React from "react";
import { Card, Image, Container } from "semantic-ui-react";
import PropTypes from "prop-types";

function Book({ book }) {
  // think about what to do for images that don't exist as they are truthy
  return (
    <Container>
      <Card centered style={{ margin: "30px auto"}}>
        <Image style={{ width: "100%" }} src={`${book.image}`} />
        <Card.Content>
          <Card.Header>{book.title}</Card.Header>
          <Card.Meta>{book.author}</Card.Meta>
        </Card.Content>
      </Card>
    </Container>
  );
}

Book.propTypes = {};

export default Book;
