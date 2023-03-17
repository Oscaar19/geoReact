import { configureStore } from '@reduxjs/toolkit'
import { marksReducer } from './slices/placeMarkSlice'
import reviewSlice from './slices/reviews/reviewSlice'
import { todosReducer } from './slices/todoSlice'

const store = configureStore({
    reducer: {
        todos: todosReducer,
        marks: marksReducer,
        reviews: reviewSlice,

    }

})
  

export default store