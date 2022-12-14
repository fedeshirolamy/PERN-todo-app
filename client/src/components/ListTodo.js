import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`/todos/${id}`, {
                method: 'DELETE'
            })

            setTodos(todos.filter(todo => todo.todo_id !== id));
            
        } catch (err) {
            console.error(err.message);
        }
    }

    const getTodos = async () => {
        try {
            
            const response = await fetch('/todos');
            const jsonData = await response.json();
            
            setTodos(jsonData);

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getTodos()
    },[]);

    return (
        <Fragment>
            {" "}
            <table className="table table-dark mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/*
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    */}
                    {todos.map(todo => {
                        return (
                           <tr key={todo.todo_id}>
                                <td>{todo.description}</td> 
                                <td><EditTodo todo={todo} /></td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteTodo(todo.todo_id)}
                                    >
                                        X
                                    </button>
                                </td>
                            </tr> 
                            
                        )
                        
                    })}
                    
                </tbody>                
            </table>            
        </Fragment>
    )
}

export default ListTodos;