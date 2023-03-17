import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    places: [],
    page: 0,
    isLoading: false,
    missatge: "",
}

export const placeSlice = createSlice({
    name: 'place',
    initialState, 
    reducers: {
        
    },
})

// Action creators are generated for each case reducer function
export const { increment } = placeSlice.actions

export default placeSlice.reducer