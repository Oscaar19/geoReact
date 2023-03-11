import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deltodo, toggletodo } from '../slices/todoSlice'

const ToDo = ({todo}) => {
  const dispatch = useDispatch()
  return (
    <>
      {todo.done ? 
        <strike>{todo.description}</strike>
        :
        <p>{todo.description}</p>
      }
      
      <td><button onClick = {()=> dispatch(deltodo(todo.id))} > ESBORRAR </button></td>
      {todo.done ? 
        <td><button onClick={() => dispatch(toggletodo(todo.id))}>NO FET</button></td> 
        :
        <td><button onClick={() => dispatch(toggletodo(todo.id))}>FET</button></td>
      }
      
    </>
  )
}

export default ToDo