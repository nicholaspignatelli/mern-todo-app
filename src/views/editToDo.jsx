import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, Label } from "formik";

const SERVER_URL = "http://localhost:4000/todos/";

const EditTodo = (props) => {
  // 1.  Create the state hook for the todo to be edited.
  const [todo, setTodo] = useState({
    description: "",
    assignee: "",
    priority: "",
    isComplete: false,
  });

  // 2. upon first render, call get request to populate the state object from 1.
  useEffect(() => {
    axios
      .get(SERVER_URL + props.match.params.id)
      .then((response) => {
        setTodo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // When edit is confirmed, submit post request
  const onSubmitEdit = (e) => {
    e.preventDefault();
    axios
      .post(SERVER_URL + "edit/" + props.match.params.id, todo)
      .then((res) =>
        console.log(`Here's a receipt of the update.\n${res.data}`)
      )
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3 align="center">Edit Todo</h3>
      <form onSubmit={(e) => onSubmitEdit(e)}>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            className="form-control"
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Assignee: </label>
          <input
            type="text"
            className="form-control"
            value={todo.assignee}
            onChange={(e) => setTodo({ ...todo, assignee: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Low"
              checked={todo.priority === "Low"}
              onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
            />
            <label className="form-check-label">Low</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Medium"
              checked={todo.priority === "Medium"}
              onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
            />
            <label className="form-check-label">Medium</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="High"
              checked={todo.priority === "High"}
              onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
            />
            <label className="form-check-label">High</label>
          </div>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            id="completedCheckbox"
            type="checkbox"
            name="completedCheckbox"
            onChange={() => setTodo({ ...todo, isComplete: !todo.isComplete })}
            checked={todo.isComplete}
            value={todo.isComplete}
          />
          <label className="form-check-label" htmlFor="completedCheckbox">
            Completed
          </label>
        </div>

        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Todo"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
