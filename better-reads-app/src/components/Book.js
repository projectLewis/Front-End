// import React, { useState, useEffect } from "react";
// import { Card, Image, Container, Modal, Button, Icon } from "semantic-ui-react";
// import BookModal from "./BookModal";
// // import SaveIcon from "./SaveIcon";

// import { axiosWithAuth } from "../functions/authorization.js";

// function Book({ recommendedBook, savedBookList, handleSave }) {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [bookToSave, setBookToSave] = useState(null);
//   const [bookToDeleteId, setBookToDeleteId] = useState(null);
//   const [liked, setLiked] = useState(null);

//   const userId = localStorage.getItem("user_id");

//   useEffect(() => {
//     for (let i = 0; i < savedBookList.length; i++) {
//       if (savedBookList[i].isbn === recommendedBook.isbn) {
//         return setLiked(true);
//       }
//     }
//     return setLiked(false);
//   }, [recommendedBook.isbn, liked, savedBookList]);

//   useEffect(() => {
//     if (bookToSave) {
//       axiosWithAuth()
//         .post(
//           `https://better-reads-db.herokuapp.com/api/books/save/${userId}`,
//           bookToSave,
//         )
//         .then(res => {
//           handleSave(res.data);
//           setBookToSave(null);
//         })
//         .catch(err => console.error(err));
//     }
//   }, [bookToSave, handleSave, userId]);

//   useEffect(() => {
//     if (bookToDeleteId) {
//       const bookToDeleteObject = {
//         book_id: bookToDeleteId,
//       };
//       axiosWithAuth()
//         .delete(
//           `https://better-reads-db.herokuapp.com/api/books/save/${userId}`,
//           bookToDeleteObject,
//         )
//         .then(res => {
//           console.log("res in delete", res);
//           handleSave(res.data);
//           setBookToDeleteId(null);
//         })
//         .catch(err => console.error(err));
//     }
//   }, [bookToDeleteId, handleSave, userId]);

//   function addToSavedList() {
//     setBookToSave({
//       title: recommendedBook.title,
//       author: recommendedBook.author,
//       isbn: recommendedBook.isbn,
//     });
//   }

//   function deleteFromSavedList() {
//     setBookToDeleteId(`${recommendedBook.isbn}`);
//     // setBookToDelete(prevBook => {
//     //   prevBook = { data: { isbn: `${book.isbn}` } };
//     //   return prevBook;
//     // });
//   }

//   function openModal() {
//     setModalOpen(true);
//   }
//   function closeModal() {
//     setModalOpen(false);
//   }
//   return (
//     <Container style={{ width: "auto", marginBottom: "20px" }}>
//       <Card centered>
//         <Image
//           onClick={openModal}
//           style={{ height: "350px", width: "100%" }}
//           src={`https://covers.openlibrary.org/b/isbn/${
//             recommendedBook.isbn
//           }-M.jpg?default=false`}
//           onError={e => {
//             e.target.onerror = null;
//             e.target.src = require("../imgs/cover_not_found.png");
//           }}
//         />
//         <Card.Content style={{ maxHeight: "300px" }}>
//           <Card.Header onClick={openModal}>{recommendedBook.title}</Card.Header>
//           <Card.Meta onClick={openModal}>{recommendedBook.author}</Card.Meta>
//           {localStorage.getItem("token") && liked ? (
//             <Icon className="heart" color="red" onClick={deleteFromSavedList} />
//           ) : (
//             <Icon className="heart outline" onClick={addToSavedList} />
//           )}
//         </Card.Content>
//       </Card>
//       <Modal size={"large"} open={isModalOpen} onClose={closeModal}>
//         <Modal.Header>More info</Modal.Header>
//         <Modal.Content>
//           <BookModal isbn={recommendedBook.isbn} />
//         </Modal.Content>
//         <Modal.Actions>
//           <Button negative onClick={closeModal}>
//             Close
//           </Button>
//         </Modal.Actions>
//       </Modal>
//     </Container>
//   );
// }

// Book.propTypes = {};

// export default Book;

import React, { useState, useEffect } from "react";
import { Card, Image, Container, Modal, Button } from "semantic-ui-react";
import BookModal from "./BookModal";
import SaveIcon from "./SaveIcon";

import { axiosWithAuth } from "../functions/authorization.js";

function Book({ recommendedBook, savedBookList, handleSave }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookToSave, setBookToSave] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [liked, setLiked] = useState(null);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    for (let i = 0; i < savedBookList.length; i++) {
      if (savedBookList[i].isbn === recommendedBook.isbn) {
        return setLiked(true);
      }
    }
    return setLiked(false);
  }, [recommendedBook.isbn, liked, savedBookList]);

  useEffect(() => {
    if (bookToSave) {
      console.log("object of saving book", bookToSave);
      axiosWithAuth()
        .post(
          `https://better-reads-db.herokuapp.com/api/books/save/${userId}`,
          bookToSave,
        )
        .then(res => {
          console.log("res of save request", res);
          handleSave(res.data);
        })
        .catch(err => console.error(err));
    }
  }, [bookToDelete, bookToSave, handleSave, userId]);

  useEffect(() => {
    if (bookToDelete) {
      console.log("id of deleting book", bookToDelete);
      axiosWithAuth()
        .delete(
          `https://better-reads-db.herokuapp.com/api/books/save/${userId}`,
          bookToDelete,
        )
        .then(res => {
          console.log("res of delete request", res);
          const newSavedBooksArray = [...savedBookList].filter(
            savedBook => savedBook.isbn !== res.config.data.isbn,
          );
          handleSave(newSavedBooksArray);
        })
        .catch(err => console.error(err));
    }
  }, [bookToDelete, handleSave, savedBookList, userId]);

  function addToSavedList() {
    setBookToSave({
      title: recommendedBook.title,
      author: recommendedBook.author,
      isbn: recommendedBook.isbn,
    });
  }

  function deleteFromSavedList() {
    setBookToDelete(prevBook => {
      const deletingBook = savedBookList.find(
        book => book.isbn === recommendedBook.isbn,
      );
      console.log(deletingBook);
      prevBook = { book_id: `${deletingBook.id}` };
      return prevBook;
    });
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
          onClick={openModal}
          style={{ height: "350px", width: "100%" }}
          src={`https://covers.openlibrary.org/b/isbn/${
            recommendedBook.isbn
          }-M.jpg?default=false`}
          onError={e => {
            e.target.onerror = null;
            e.target.src = require("../imgs/cover_not_found.png");
          }}
        />
        <Card.Content style={{ maxHeight: "300px" }}>
          <Card.Header onClick={openModal}>{recommendedBook.title}</Card.Header>
          <Card.Meta onClick={openModal}>{recommendedBook.author}</Card.Meta>
          {localStorage.getItem("token") && (
            <SaveIcon
              liked={liked}
              addToSavedList={addToSavedList}
              deleteFromSavedList={deleteFromSavedList}
            />
          )}
        </Card.Content>
      </Card>

      {/* </Modal> */}
      <Modal size={"large"} open={isModalOpen} onClose={closeModal}>
        <Modal.Header>More info</Modal.Header>
        <Modal.Content>
          <BookModal isbn={recommendedBook.isbn} />
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

export default Book;
