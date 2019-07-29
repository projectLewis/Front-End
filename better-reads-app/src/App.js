import React from "react";
import { Route } from "react-router-dom";

// import components
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </div>
  );
}

export default App;
