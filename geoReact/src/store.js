import { configureStore } from '@reduxjs/toolkit'
import { marksReducer } from './slices/placeMarkSlice'
import placeSlice from './slices/places/placeSlice'
import reviewSlice from './slices/reviews/reviewSlice'
import { todosReducer } from './slices/todoSlice'

const store = configureStore({
    reducer: {
        todos: todosReducer,
        marks: marksReducer,
        reviews: reviewSlice,
        places: placeSlice,

    }

})
  

export default store