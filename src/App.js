import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateToDo from "./views/createToDo.jsx";
import EditToDo from "./views/editToDo.jsx";
import ViewTodos from "./views/ViewTodos.jsx";

const App = (props) => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a
            class="navbar-brand"
            href="https://codingthesmartway.com"
            target="_blank"
          ></a>
          <Link to="/" className="navbar-brand">
            MERN-Stack Todo App
          </Link>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  To Dos
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  Create A new Task
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/" exact component={ViewTodos} />
        <Route path="/edit/:id" component={EditToDo} />
        <Route path="/create" component={CreateToDo} />
      </div>
    </Router>
  );
};

export default App;
