import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    places: [],
    place:{ 
        file: { filepath:""},
        author: { name: ""},
        name: "",
        description: "",
        visibility:"",
        latitude: 0,
        longitude: 0
    }, 
    page: 0,
    isLoading: true,
    missatge: "",
    adding: false,
    favorite: false,
}

export const placeSlice = createSlice({
    name: 'place',
    initialState, 
    reducers: {
        startLoadingPlaces: (state) => {

            state.isLoading = true;

        },

        setMissatge: (state, action) => {

            state.missatge = action.payload

        },
        setPlaces: (state, action) => {

            state.places = action.payload

            state.isLoading = false
        },
        setPlace: (state, action) => {

            state.place = action.payload

            state.isLoading = false
        },
        setAdding: (state) => {

            state.adding = true

        },
        
        setFavorite: (state,action) => {

            state.favorite = action.payload
            state.isLoading=false

        },
    },
})

// Action creators are generated for each case reducer function
export const { startLoadingPlaces, setPlaces,setMissatge,setPlace,setFormulari,setAdding,setFavorite } = placeSlice.actions

export default placeSlice.reducer