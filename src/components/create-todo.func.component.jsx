import React, {useState} from 'react';
import axios from 'axios';

const serverUrl = 'http://localhost:4000/todos/add';

const CreateTodo = (props) => {
    // on Render itll reset...
    const [todoDescrState,setToDoDescrState] = useState('');
    const [todoResponsibleState,setToDoResponsibleState] = useState('');
    const [todoPriorityState,setToDoPriorityState] = useState('');
    const onSubmit = e => {
        e.preventDefault();
        const newTodo = {
            todo_description: todoDescrState,
            todo_responsible: todoResponsibleState,
            todo_priority: todoPriorityState,
            todo_completed: false
        }
        axios.post(serverUrl, newTodo)
        .then(res => console.log('lol from the serv' + res.data));
    }

    return (
        <div style={{marginTop: 10}}>
            <h3>Create New Todo</h3>
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

                <div className="form-group">
                    <input type="submit" value="Create Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateTodo;