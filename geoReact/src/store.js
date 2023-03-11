import { configureStore } from '@reduxjs/toolkit'
import { marksReducer } from './slices/placeMarkSlice'
import { todosReducer } from './slices/todoSlice'

const store = configureStore({
    reducer: {
        todos: todosReducer,
        marks: marksReducer

    }

})
  

export default store