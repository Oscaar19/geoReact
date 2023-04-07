import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import PlaceGrid from './PlaceGrid';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useFetch from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { getPlaces } from "../slices/places/thunks";
import PlaceAdd from "./PlaceAdd";
import Paginate from "../pages/Paginate";

export default function PlacesGrid() {
    let {authToken,setAuthToken,usuari, setUsuari} = useContext(UserContext)
    const { places = [], page=0, isLoading=true, missatge="",adding=false,filter} = useSelector((state) => state.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaces(page,authToken));        
    }, [page,filter]);




    function isPublic(place) {
        return place.visibility.name == "public"
    }

    function isOwner(place) {
        return place.author.name == usuari
    }

    return (
        <>
            { isLoading ? (<div> Cargando ...</div>) : ( 
                (adding ? <PlaceAdd></PlaceAdd> : ""),
                <>
                    <Container className="bg-secondary mw-100">
                        <Row>
                            {places.map ((place) => ( 
                                (isPublic(place) || isOwner(place)) ?
                                    <Col sm><PlaceGrid place={place}/></Col>
                                : ""
                            ))}
                        </Row>
                        <Paginate/>
                    </Container>
                </>                
            )}
        </>
    )
}