import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = 'http://localhost:4000/todos/';

const EditTodo = props => {
    const [todoDescrState,setToDoDescrState] = useState('');
    const [todoResponsibleState,setToDoResponsibleState] = useState('');
    const [todoPriorityState,setToDoPriorityState] = useState('');
    const [todoCompleteState, setToDoCompleteState] = useState(false);
    const onSubmit = e => {
        e.preventDefault();
        const todo = {
            todo_description: todoDescrState,
            todo_responsible: todoResponsibleState,
            todo_priority: todoPriorityState,
            todo_completed: false
        }
        axios.post(SERVER_URL+'update/'+props.match.params.id, todo)
            .then(res => console.log(res.data));
    }

    useEffect(() => {
        axios.get(SERVER_URL+props.match.params.id)
            .then(response => {
                setToDoDescrState(response.data.todo_description);
                setToDoResponsibleState(response.data.todo_responsible);
                setToDoPriorityState(response.data.todo_priority);
                setToDoCompleteState(response.data.todo_completed);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div>
            <h3 align="center">Update Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                            className="form-control"
                            value={todoDescrState}
                            onChange={e => setToDoDescrState(e.target.value)}
                            />
                </div>
                <div className="form-group">
                    <label>Responsible: </label>
                    <input 
                            type="text" 
                            className="form-control"
                            value={todoResponsibleState}
                            onChange={e => setToDoResponsibleState(e.target.value)}
                            />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" 
                                type="radio" 
                                name="priorityOptions" 
                                id="priorityLow" 
                                value="Low"
                                checked={todoPriorityState==='Low'} 
                                onChange={e => setToDoPriorityState(e.target.value)}
                                />
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" 
                                type="radio" 
                                name="priorityOptions" 
                                id="priorityMedium" 
                                value="Medium" 
                                checked={todoPriorityState==='Medium'} 
                                onChange={e => setToDoPriorityState(e.target.value)}
                                />
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" 
                                type="radio" 
                                name="priorityOptions" 
                                id="priorityHigh" 
                                value="High" 
                                checked={todoPriorityState==='High'} 
                                onChange={e => setToDoPriorityState(e.target.value)}
                                />
                        <label className="form-check-label">High</label>
                    </div>
                </div>
                <div className="form-check">
                    <input  className="form-check-input"
                            id="completedCheckbox"
                            type="checkbox"
                            name="completedCheckbox"
                            onChange={() => setToDoCompleteState(!todoCompleteState)}
                            checked={todoCompleteState}
                            value={todoCompleteState}
                            />
                    <label className="form-check-label" htmlFor="completedCheckbox">
                        Completed
                    </label>                        
                </div>

                <br />

                <div className="form-group">
                    <input type="submit" value="Update Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditTodo;