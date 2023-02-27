import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import PlaceGrid from './PlaceGrid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useFetch from "../hooks/useFetch";

export default function PlacesGrid() {
    let {authToken,setAuthToken} = useContext(UserContext)
    let {usuari, setUsuari} = useContext(UserContext)
    let [missatge, setMessage] = useState("");


    let { data, error, loading,reRender } = useFetch("https://backend.insjoaquimmir.cat/api/places", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer '  + authToken,
        },
        method: "GET",
        
    })


    const deletePlace = async (id) => {
        try{
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer '  + authToken,
                },
                method: "DELETE",
            })
            const resposta = await data.json();
            if (resposta.success === true) {
                reRender()
            }
            setMessage(resposta.message)
        }catch(e) {
            console.log(e);
            alert("Se ha producido un error.");
        }
    }



    function isPublic(place) {
        return place.visibility.name == "public"
    }

    function isOwner(place) {
        return place.author.name == usuari
    }

    return (
        <>
            { loading ? (<div> Cargando ...</div>) : ( 
                <Container className="bg-secondary mw-100">
                    <Row>
                        {data.data.map ((place) => ( 
                            (isPublic(place) || isOwner(place)) ?
                                <Col sm><PlaceGrid place={place}  deletePlace={deletePlace}/></Col>
                            : ""
                        ))}
                    </Row>
                </Container>
            )}
        </>
    )
}