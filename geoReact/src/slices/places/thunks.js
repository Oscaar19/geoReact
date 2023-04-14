import { setMissatge, setPlaces, startLoadingPlaces, setPlace,setFavorite, setPages, setFilter } from './placeSlice'


export const getPlaces = (page = 0,authToken) => {

    return async (dispatch, getState) => {

        dispatch(startLoadingPlaces());

        const headers = {

            headers: {

                Accept: "application/json",

                "Content-Type": "application/json",

                Authorization: "Bearer " + authToken,

            },

            method: "GET",

        };

        const filtre = getState().places.filter

        let url =
        page > 0
        ? "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page
        : "https://backend.insjoaquimmir.cat/api/places";

        let inter = page > 0 ? "&" : "?"
        let description = filtre.description == "" ? "" : "description="+filtre.description
        let author = filtre.author == "" ? "" : "author="+filtre.author

        url = url + inter + description + "&" + author
        
        const data = await fetch(url, headers);
 
        const resposta = await data.json();

        if (resposta.success == true) {

            if (page > 0) {

                dispatch(setPlaces(resposta.data.collection));
                
                dispatch(setPages(resposta.data.links));
                                
            } else {
                
                dispatch(setPlaces(resposta.data));
                
            }
        }

        else {

            dispatch(setMissatge(resposta.message));

        }


    };
}

export const getPlace = (authToken, id) => {

    return async (dispatch, getState) => {
        dispatch(startLoadingPlaces());

        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '  + authToken,

            },
            method: "GET",
        })

        const resposta = await data.json();
        console.log(resposta)
        if (resposta.success == true) {
            dispatch(setPlace(resposta.data));
            dispatch(testFavorite(authToken,id))

        }

        else {

            dispatch(setMissatge(resposta.message));

        }

    };
}


export const deletePlace = (id,authToken) => {

    return async (dispatch, getState) => {

        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id,

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
            dispatch(getPlaces(0,authToken));
        }

        else {

            dispatch(setMissatge(resposta.message));

        }
    };
}


export const addPlace = (formulari,authToken) => {

    return async (dispatch, getState) => {

        let {name,description,upload,latitude,longitude,visibility}=formulari;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("upload", upload);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("visibility", visibility);

        console.log("AAAAAAAA")

        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/",

            {

                headers: {

                    Accept: "application/json",
                    Authorization: "Bearer " + authToken,

                },

                method: "POST",
                body: formData

            }

        );
        
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(setMissatge("Place afegit correctament."))
            dispatch(getPlaces(0,authToken));
        }

        else {

            dispatch(setMissatge(resposta.message));

        }
    };
}

export const editPlace = (id,authToken,formulari) => {

    return async (dispatch,state) => {

        let {name,description,upload,latitude,longitude,visibility}=formulari;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("upload", upload);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("visibility", visibility);

        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
            headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken 
            },
            method: "POST",
            body: formData
        });

        const resposta = await data.json();
        if (resposta.success === true) dispatch(setMissatge("Place editat correctament."))
        else dispatch(setMissatge(resposta.message))

    }
}

export const testFavorite = (authToken,id) => {
    return async (dispatch,state) => {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id+"/favorites", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '  + authToken,

            },
            method: "POST",
        })
        const resposta = await data.json();
        if (resposta.success === true) {
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id+"/favorites", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer '  + authToken,

                },
                method: "DELETE",
            })
        }else{
            dispatch(setFavorite(true))
        }
        console.log("Salgo del test")
    }
}

export const favPlace = (id,authToken,place) => {

    return async (dispatch,state) => {
        console.log("Entro al fav")
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id+"/favorites", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '  + authToken,

            },
            method: "POST",
        })
        const resposta = await data.json();
        if (resposta.success === true) {
            dispatch(setFavorite(true))
            dispatch(setPlace({...place,favorites_count:place.favorites_count+1}))
        }
    }
}

export const unfavPlace = (id,authToken,place) => {

    return async (dispatch,state) => {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id+"/favorites", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '  + authToken,

            },
            method: "DELETE",
        })
        const resposta = await data.json();
        if (resposta.success === true) {
            dispatch(setFavorite(false))
            dispatch(setPlace({...place,favorites_count:place.favorites_count-1}))
        }
    }
}