import React, { useState, useEffect,useContext, useReducer } from 'react';
import {useLocation, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import ReviewsList from './reviews/ReviewsList';
import placesMarksReducer from './placesMarksReducer';
import Button from 'react-bootstrap/esm/Button';
import Swal from 'sweetalert2'

const initialState = [];

const init = ()=> {

    return JSON.parse(localStorage.getItem("marks")) || []

}


const Place = () => {

    const [marks, dispatchPlaces] = useReducer(placesMarksReducer, initialState,init);
    const { pathname } = useLocation()

    const { id } = useParams();
    let [place,setPlace] = useState({})
    const [ isLoading, setIsLoading] = useState(true)
    let { authToken, setAuthToken } = useContext(UserContext);
    let {usuari, setUsuari} = useContext(UserContext)
    let [favorite, setFavorite] = useState(false)

    useEffect(() => {
        localStorage.setItem("marks", JSON.stringify(marks));
    }, [marks]);

    function isOwner(place) {
        return place.author.email == usuari
    }

    const favPlace = async () => {
        try{
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
                setFavorite(true)
                setPlace({...place,favorites_count:place.favorites_count+1})
            }
        }catch(e) {
            console.log(e);
            alert("Se ha producido un error.");
        }
    }

    const unfavPlace = async () => {
        try{

            try{
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
                    setFavorite(false)
                    setPlace({...place,favorites_count:place.favorites_count-1})
                }
            }catch(e) {
                console.log(e);
                alert("Se ha producido un error.");
            }
            
        }catch(e) {
            console.log(e);
            alert("Se ha producido un error.");
        }
    }

    const markPlace = (place) => {
        console.log("Afegeixo");
        console.log({ place });

        const mark = {
            id: new Date().getTime(),
            name: place.name,
            description: place.description,
            ruta: pathname
        };

        const action = {
            type: "Add mark",
            payload: mark
        };
        console.log(mark)
        dispatchPlaces(action);

        Swal.fire(
            'Bé!',
            'Has desat aquest place!.',
            'success'
        )
    };

    
    const getPlace = async () => {
        try{
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer '  + authToken,

                },
                method: "GET",
            })
            const resposta = await data.json();
            if (resposta.success === true) {
                setPlace(resposta.data);
                setIsLoading(false);
            }
            else console.log("There is not any place.")
        }catch(e) {
            console.log(e);
            alert("Se ha producido un error.");
        }
    }

    const testFavorite = async () => {
        try{
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
                setFavorite(true)
            }
        }catch(e) {
            console.log(e);
            alert("Se ha producido un error.");
        }
    }
    useEffect(() => {
        getPlace();
        testFavorite()
    }, [])


    return (
        <>

        { isLoading ? (<div> Me cargo ....</div>) : (  
            <Container className="mw-100 mh-100 bg-secondary">
                <br />
                <Card className="bg-dark text-white mx-auto w-50 p-3" style={{ width: '18rem' }}>
                    <Card.Img width="100px" height="200px" variant="top" src={"https://backend.insjoaquimmir.cat/storage/"+ place.file.filepath}/>
                    <Card.Body>
                        <Card.Title>{place.name}</Card.Title>
                        <br />
                        <Card.Subtitle>Autor: {place.author.name}</Card.Subtitle>
                        <br />
                        <Card.Text>{place.description}</Card.Text>
                        <Card.Text>{place.favorites_count} 
                            { !favorite ? (<button type="button" className="btn btn-link text-white" onClick={(() => {
                                favPlace()
                            })}><svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                </svg></button>) 
                            : ( <button type="button" className="btn btn-link text-white" onClick={(() => {
                                unfavPlace()
                            })}><svg width="25px" height="25px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#DD2E44" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242z"></path></svg></button>)
                            }
                        </Card.Text>
                        <Card.Text>Hi ha un total de {place.reviews_count} ressenyes.</Card.Text>
                    </Card.Body>
                    {(isOwner(place)) ?                        
                        <Card.Body>
                            <Link className="link-secondary text-decoration-none text-uppercase" to={"/places/"+place.id}>&nbsp;VEURE&nbsp;&nbsp;</Link>
                            <Link className="link-secondary text-decoration-none text-uppercase" to={"/places/edit/"+place.id}>&nbsp;EDITAR&nbsp;&nbsp;</Link>
                            <Link className="link-secondary text-decoration-none text-uppercase" to="/places/grid">&nbsp;ESBORRAR&nbsp;&nbsp;</Link>
                        </Card.Body>
                    :  
                        <Card.Body>
                            <Button variant="warning" onClick={() => markPlace(place)}>DESAR</Button>
                        </Card.Body>
                    }
                    
                </Card>
                <div><ReviewsList place={place}/></div>
            </Container>
        )}
        </>
    )
}

export default Place
