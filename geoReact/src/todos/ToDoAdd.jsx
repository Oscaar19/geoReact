import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import useForm from '../hooks/useForm';
import { addtodo } from '../slices/todoSlice';

const ToDoAdd = () => {
    const dispatch = useDispatch(); 
      
    let [missatge, setMessage] = useState("");

    const { description, formState, handleChange, onResetForm } = useForm({
        description: ""
    });

    const onFormSubmit = (event) => {
        event.preventDefault();
        if (description.length <= 1) return;

        const newTodo = {
            id: new Date().getTime(),
            description: description,
            done: false
        };

        onResetForm();
        dispatch(addtodo(newTodo))
    };
    return (
        <>
            <div className="container bg-secondary mw-100 h-100 d-flex justify-content-center">
                <div>
                    <div className="container">
                        <h1>Add TODO</h1>
                    </div>
                    <form>
                        <input className="sr-only" name="description" type="text" placeholder="Description" onChange={handleChange} />
                        <br />
                        <br />
                        {missatge ? <div>{missatge}</div> : <></>}
                        <br />
                        <button className="btn btn-primary"
                        onClick={(e) => {
                            onFormSubmit(e);
                        }}
                        >
                        CREATE TODO
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ToDoAdd