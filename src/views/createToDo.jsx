import React, { useState } from "react";
import axios from "axios";

const serverUrl = "http://localhost:4000/todos/add";

const CreateTodo = (props) => {
  // State Hooks
  const [todo, setTodo] = useState({
    description: "",
    assignee: "",
    priority: "",
    isComplete: false,
  });

  // Submit Handlers
  const onSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      description: todo.description,
      assignee: todo.assignee,
      priority: todo.priority,
      isComplete: todo.isComplete,
    };
    axios
      .post(serverUrl, newTodo)
      .then((res) => {
        console.log(`Added New Todo: ${JSON.stringify(res.data, 2, null)}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Create New Todo</h3>
      <form onSubmit={onSubmit}>
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
          <label>Responsible: </label>
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

        <div className="form-group">
          <input type="submit" value="Add" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;
