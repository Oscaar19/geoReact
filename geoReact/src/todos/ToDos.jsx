import React, { useEffect, useReducer } from 'react'
import ToDo from './ToDo';
import ToDoAdd from './ToDoAdd';
import todosReducer from './todosReducer';

const initialState = [];

const init = ()=> {

    return JSON.parse(localStorage.getItem("todos")) || []

}

const ToDos = () => {
    const [todos, dispatchTodos] = useReducer(todosReducer, initialState,init);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    
    const handleNewToDo = (todo) => {
        console.log("Afegeixo");
        console.log({ todo });

        const action = {
            type: "Add Todo",
            payload: todo
        };
        dispatchTodos(action);
    };

    const handleDeleteToDo = (id) => {
        console.log("AQui arribo " + id);
        dispatchTodos({
            type: "Del Todo",
            payload: id
        });
    };

    const handleToggleToDo = (id) => {
        dispatchTodos({
            type: "Toggle Todo",
            payload: id
        });
    };

    return (
        <>
            <div><ToDoAdd handleNewToDo={handleNewToDo} /></div>
            <table className="bg-secondary d-flex justify-content-center">
                <tbody>
                    {todos.map((todo) => (
                        <tr>
                            <ToDo key={todo.id} todo={todo} handleDeleteToDo={handleDeleteToDo} handleToggleToDo={handleToggleToDo}/>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ToDos