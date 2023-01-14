import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Todo from "../components/Todo";

const ToDosList = (props) => {
  const [todos, setTodos] = useState([]);
  const handleEdit = (props) => {
    // change mode to edit
    // preserve data associatred
    console.log(props);
  };
  useEffect(
    () =>
      axios
        .get("http://localhost:4000/todos/")
        .then((response) => setTodos(response.data))
        .catch((err) => console.log(err)),
    []
  );

  return (
    <div>
      <h3>Todos List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Assignee</th>
            <th>Priority</th>
            <th>Completed</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {todos.map(({ _id, description, assignee, priority, isComplete }) => {
            return (
              <Todo
                key={_id}
                _id={_id}
                description={description}
                assignee={assignee}
                priority={priority}
                isComplete={isComplete}
                mode={"view"}
              />
            );
          })}
          )
        </tbody>
      </table>
    </div>
  );
};

export default ToDosList;
