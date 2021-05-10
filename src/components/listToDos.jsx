import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

const ToDosList = props => {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/todos/')
            .then(response => setTodos(response.data))
            .catch(error=> console.log(error))
    }, []);

    const todoList = () => {
        return todos.map((currentTodo, index) => {
            return <Todo todo={currentTodo} key={index}/>
        })
    }

    return (
        <div>
            <h3>Todos List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { todoList() }
                </tbody>
            </table>
        </div>
    )
}

export default ToDosList;