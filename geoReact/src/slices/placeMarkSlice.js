import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    marks: JSON.parse(localStorage.getItem("marks")) || [],
    isMarked: false
}



export const placesSlice = createSlice({
    name: 'places',
    initialState, 
    reducers: {
        addmark: (state,action) => {
            state.marks.push(action.payload) // aqui podem fer push
            state.isMarked=true
        },

        delmark: (state,action) => {
            state.marks = state.marks.filter( marks => marks.id !== action.payload)
        },
        ismarked: (state,action) => {
            state.isMarked=false
            state.marks.map((mark) =>{
                if(mark.id == action.payload){
                    state.isMarked=true
                }
            })
        },
    },
})

// Action creators are generated for each case reducer function
export const { addmark,delmark,ismarked } = placesSlice.actions

export const marksReducer =  placesSlice.reducer