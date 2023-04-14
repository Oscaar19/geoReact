import { setAdd, setMissatge, setReviews, setReviewsCount, startLoadingReviews } from './reviewSlice'

export const getReviews = (page = 0, id, authToken, usuari = "") => {

    return async (dispatch, getState) => {

        dispatch(startLoadingReviews());

        const headers = {

            headers: {

                Accept: "application/json",

                "Content-Type": "application/json",

                Authorization: "Bearer " + authToken,

            },

            method: "GET",

        };

        const url = "https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews"

        const data = await fetch(url, headers);

        const resposta = await data.json();

        if (resposta.success == true) {

            dispatch(setReviews(resposta.data));
            dispatch(setReviewsCount(resposta.data.length))

        }

        else {

            dispatch(setMissatge(resposta.message));

        }

        resposta.data.map((v) => {

            if (v.user.email === usuari) {

                dispatch(setAdd(false));

                console.log("Te review");

            }

        });

    };
}

export const delReview = (review, authToken) => {

    return async (dispatch, getState) => {

        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" +review.place.id +"/reviews/" +review.id,

            {

                headers: {

                    Accept: "application/json",

                    "Content-Type": "application/json",

                    Authorization: "Bearer " + authToken,

                },

                method: "DELETE",

            }

        );

        const resposta = await data.json();

        if (resposta.success == true) {

            console.log("OK");

            dispatch(setAdd(true));

            // usuari no l'indiquem i per defecta estarà a ""

            dispatch(getReviews(0, review.place.id, authToken))

            const state = getState()
            dispatch (setReviewsCount(state.reviewsCount - 1));


        }

    };

};

export const addReview = (data,authToken,id) => {

    const {review} = data

    return async (dispatch,getState) => {

        
        const formData = new FormData();

        formData.append("review", review);

        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id+"/reviews", {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + authToken 
            },
            method: "POST",
            body: formData
        });

        const resposta = await data.json();

        if (resposta.success === true) {
            // usuari no l'indiquem i per defecta estarà a ""

            dispatch(getReviews(0,id, authToken))
            dispatch(setAdd(false))

            const state = getState()
            dispatch (setReviewsCount(state.reviewsCount + 1));
        }
        else dispatch(setMissatge(resposta.message));

    }
};