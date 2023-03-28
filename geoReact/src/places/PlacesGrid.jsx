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
    const { places = [], page=0, isLoading=true, missatge="",adding=false} = useSelector((state) => state.places);
    const dispatch = useDispatch();


    // let { data, error, loading,reRender } = useFetch("https://backend.insjoaquimmir.cat/api/places", {
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         'Authorization': 'Bearer '  + authToken,
    //     },
    //     method: "GET",
        
    // })


    // const deletePlace = async (id) => {
    //     try{
    //         const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 'Authorization': 'Bearer '  + authToken,
    //             },
    //             method: "DELETE",
    //         })
    //         const resposta = await data.json();
    //         setMessage(resposta.message)
    //     }catch(e) {
    //         console.log(e);
    //         alert("Se ha producido un error.");
    //     }
    // }

    useEffect(() => {
        dispatch(getPlaces(page,authToken));        
    }, [page]);




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