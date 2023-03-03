import React from 'react'

const ToDo = ({todo,handleDeleteToDo,handleToggleToDo}) => {

  return (
    <>
      {todo.done ? 
        <strike>{todo.description}</strike>
        :
        <p>{todo.description}</p>
      }
      
      <td><button onClick={(e) => {handleDeleteToDo(todo.id)}}>ESBORRAR</button></td>
      {todo.done ? 
        <td><button onClick={(e) => {handleToggleToDo(todo.id)}}>NO FET</button></td> 
        :
        <td><button onClick={(e) => {handleToggleToDo(todo.id)}}>FET</button></td>
      }
      
    </>
  )
}

export default ToDo