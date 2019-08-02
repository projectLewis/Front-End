import React, { useState } from "react";
import { Route } from "react-router-dom";

// import components
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Nav from "./components/Nav";
import SavedBooks from "./components/SavedBooks";
import Footer from "./components/Footer";
import EditProfile from "./components/EditProfile";

function App() {
  const [savedBookList, setSavedBookList] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([
    // {
    //   title: "The Bell Jar",
    //   author: "Sylvia Plath",
    //   image: "https://covers.openlibrary.org/b/isbn/0061148512-M.jpg",
    //   isbn: "0061148512",
    // },
    // {
    //   title: "Feminist Theory: From Margin to Center",
    //   author: "Bell Hooks",
    //   image: "https://covers.openlibrary.org/b/isbn/0896086135-M.jpg",
    //   isbn: "0896086135",
    // },
    // {
    //   title: "wordslut",
    //   author: "Amanda Montell",
    //   image: "https://covers.openlibrary.org/b/isbn/006286887X-M.jpg",
    //   isbn: "006286887X",
    // },
    // {
    //   title: "Normal People",
    //   author: "Sally Rooney",
    //   image: "https://covers.openlibrary.org/b/isbn/1984822179-M.jpg",
    //   isbn: "1984822179",
    // },
  ]);

  return (
    <div className="App">
      <div className="test">
      <Route path="/" component={Nav} />
      <Route
        exact
        path="/"
        render={props => (
          <Home
            {...props}
            savedBookList={savedBookList}
            setSavedBookList={setSavedBookList}
            recommendedBooks={recommendedBooks}
            setRecommendedBooks={setRecommendedBooks}
          />
        )}
      />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />

      <PrivateRoute
        exact
        path="/saved_books"
        component={props => (
          <SavedBooks
            {...props}
            savedBookList={savedBookList}
            setSavedBookList={setSavedBookList}
            recommendedBooks={recommendedBooks}
            setRecommendedBooks={setRecommendedBooks}
          />
        )}
      />
      <PrivateRoute
        exact
        path="/edit_profile"
        component={props => (
          <EditProfile
            {...props}
            savedBookList={savedBookList}
            setSavedBookList={setSavedBookList}
            recommendedBooks={recommendedBooks}
            setRecommendedBooks={setRecommendedBooks}
          />
        )}
      />
      </div>
      <Footer />
    </div>

  );
}

export default App;
