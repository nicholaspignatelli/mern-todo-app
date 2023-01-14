import React, { useState } from "react";

import { Link } from "react-router-dom";

const ShowView = (
  <tr>
    <td>
      <input name="description" />
    </td>
    <td>
      <input name="assignee" />
    </td>
    <td>
      <input name="priority" />
    </td>
    <td>
      <input name="isComplete" />
    </td>
    <td>
      <button onClick={null}>Confirm</button>
    </td>
  </tr>
);

const Todo = ({ _id, description, assignee, priority, isComplete, mode }) => {
  const [editToggle, setEditToggle] = useState(false);
  const handleEdit = () => {};

  return editToggle ? (
    <tr>
      <td>
        <input name="description" value={description} />
      </td>
      <td>
        <input name="assignee" value={assignee} />
      </td>
      <td>
        <input name="priority" value={priority} />
      </td>
      <td>
        <input type="radio" name="isComplete" />
      </td>
      <td>
        <button onClick={handleEdit}>Confirm</button>
      </td>
    </tr>
  ) : (
    <tr>
      <td>{description}</td>
      <td>{assignee}</td>
      <td>{priority}</td>
      <td>{isComplete ? "done" : "not done"} </td>
      <td>
        <button onClick={() => setEditToggle(!editToggle)}>Edit</button>
      </td>
    </tr>
  );
};

export default Todo;
