import React, { useState, useEffect,useContext } from 'react';
import {useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';


const Place = () => {
    const { id } = useParams();
    let [place,setPlace] = useState({})
    const [ isLoading, setIsLoading] = useState(true)
    let { authToken, setAuthToken } = useContext(UserContext);
    let {usuari, setUsuari} = useContext(UserContext)

    function isOwner(place) {
        return place.author.email == usuari
    }

    
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
                console.log(place)
                setIsLoading(false);

                console.log(resposta.data)
            }
            else console.log("There is not any place.")
        }catch(e) {
            console.log(e);
            alert("Se ha producido un error.");
        }
    }
    useEffect(() => {
        getPlace();
    }, [])
    return (
        <>

        { isLoading ? (<div> Me cargo ....</div>) : (  
            <Container className="mw-100 mh-100 align-items-center">
                <br />
                <Card className="bg-dark text-white" style={{ width: '18rem' }}>
                    <Card.Img width="100px" height="200px" variant="top" src={"https://backend.insjoaquimmir.cat/storage/"+ place.file.filepath}/>
                    <Card.Body>
                        <Card.Title>{place.name}</Card.Title>
                        <br />
                        <Card.Subtitle>Autor: {place.author.name}</Card.Subtitle>
                        <br />
                        <Card.Text>{place.description}</Card.Text>
                        <Card.Text>{place.favorites_count} <svg width="25px" height="25px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#DD2E44" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242z"></path></svg></Card.Text>
                        <Card.Text>Hi ha un total de {place.reviews_count} ressenyes.</Card.Text>
                    </Card.Body>
                    {(isOwner(place)) ?                        
                        <Card.Body>
                            <Link className="link-secondary text-decoration-none text-uppercase" to={"/places/"+place.id}>&nbsp;VEURE&nbsp;&nbsp;</Link>
                            <Link className="link-secondary text-decoration-none text-uppercase" to={"/places/edit/"+place.id}>&nbsp;EDITAR&nbsp;&nbsp;</Link>
                            <Link className="link-secondary text-decoration-none text-uppercase" to="/places/grid">&nbsp;ESBORRAR&nbsp;&nbsp;</Link>
                        </Card.Body>
                    :  <div></div>
                    }
                    
                </Card>
            </Container>
        )}
    </>
    )
}

export default Place
