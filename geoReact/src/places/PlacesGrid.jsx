import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import PlaceGrid from './PlaceGrid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function PlacesGrid() {
    let {authToken,setAuthToken} = useContext(UserContext)
    let [places,setPlaces] = useState([])
    let {usuari, setUsuari} = useContext(UserContext)

    const getPlaces = async () => {
        try{
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer '  + authToken,
                },
                method: "GET",
            })
            const resposta = await data.json();
            if (resposta.success === true) {
                setPlaces(resposta.data);
                console.log(resposta.data)
            }
            else console.log("There is not any place.")
        }catch(e) {
            console.log(e);
            alert("Se ha producido un error.");
        }
    }
    useEffect(() => {
        getPlaces();
    }, [])


    function isPublic(place) {
        return place.visibility.name == "public"
    }

    function isOwner(place) {
        return place.author.name == usuari
    }

    return (
        <>
            <Container className="bg-secondary mw-100">
                <Row>
                    {places.map ((place) => ( 
                        (isPublic(place) || isOwner(place)) ?
                            <Col sm><PlaceGrid place={place}/></Col>
                        : ""
                    ))}
                </Row>
            </Container>
        </>
    )
}