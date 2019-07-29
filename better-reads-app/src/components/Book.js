import React from "react";
import PropTypes from "prop-types";

function Book({ title, cover, description }) {
  return (
    <>
      {title}
      {cover}
      {description}
    </>
  );
}

Book.propTypes = {};

export default Book;
