import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  const userId = localStorage.getItem("user_id");

  // get users savedbooklist
  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      axios
        .get(`https://better-reads-db.herokuapp.com/api/users/list/${userId}`)
        .then(res => {
          console.log("savedBooksArray", res.data);
          setSavedBookList(res.data);
        })
        .catch(err => console.error(err));
    }
  }, [setSavedBookList, userId]);
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
