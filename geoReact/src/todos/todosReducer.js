import React from 'react'

const todosReducer = (initialState,action) => {
    switch (action.type) {

        case "Add Todo":
        
            console.log("Add todo" + action.payload )

            return [ ...initialState, action.payload]
        
        case "Del Todo":
        
            console.log("Delete todo" + action.payload )
        
            return initialState.filter( todo => todo.id !== action.payload)
        
        case "Toggle Todo":
        
            console.log("Toggle todo" + action.payload )
        
            return initialState.map ((todo)=> {

            if (todo.id === action.payload) { //id
            
                return { ...todo, done:!todo.done } // invertim el done
            
            }
            
            return todo
            
            })
        
        default:
        
        return [...initialState]
        
    }
}

export default todosReducer