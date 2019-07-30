import React from "react";
import PropTypes from "prop-types";

function Book({ book }) {
  return (
    <>
      <div>{book.title}</div>
      {book.author}
      {book.image}

    </>
  );
}

Book.propTypes = {};

export default Book;
