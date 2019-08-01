import React from "react";
import { Route } from "react-router-dom";

// import components
import PrivateRoute from "./components/PrivateRoute"
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Nav from "./components/Nav";
import SavedBooks from "./components/SavedBooks";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
      <Route path="/" component={Nav} />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/saved_books" component={SavedBooks} />
      <Footer />
    </div>
    
  );
}

export default App;
