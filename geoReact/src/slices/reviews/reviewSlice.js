import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reviews: [],
    page: 0,
    isLoading: false,
    add: true,
    missatge: "",
    reviewsCount : 0,
}

export const reviewSlice = createSlice({

    name: "review",

    initialState,

    reducers: {

        startLoadingReviews: (state) => {

            //console.log("ABA")

            state.isLoading = true;

        },

        setReviews: (state, action) => {

            state.reviews = action.payload

            state.isLoading = false
        },

        setAdd: (state, action) => {

            state.add = action.payload

        },

        setMissatge: (state, action) => {

            state.missatge = action.payload

        },
        setReviewsCount: (state,action) => {
            state.reviewsCount = action.payload
        },

        
    }

});

export const { startLoadingReviews, setReviews, setAdd, setMissatge, setReviewsCount } = reviewSlice.actions;

export default reviewSlice.reducer