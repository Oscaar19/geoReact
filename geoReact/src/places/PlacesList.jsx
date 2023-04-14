import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import PlaceList from './PlaceList';
import { useDispatch, useSelector } from "react-redux";
import { getPlaces } from "../slices/places/thunks";
import { startLoadingPlaces } from "../slices/places/placeSlice";

/**
    * This components where all the places are shown.
    */

export default function PlacesList() {
    let {authToken,setAuthToken,usuari, setUsuari} = useContext(UserContext)
    const { places = []} = useSelector((state) => state.places);
    const dispatch = useDispatch();
    const {filter} = useSelector((state) => state.places)

    useEffect(() => {
        dispatch(getPlaces(0,authToken,usuari));     
        dispatch(startLoadingPlaces())   
    }, [filter]);


    /**
        * Return if the place visibility is public
        * @param {Object} place place
        * @returns {Boolean} If it's public or not
        */
    function isPublic(place) {
        return place.visibility.name == "public"
    }

    /**
        * Return if the author of the place given is the logged in user
        * @param {Object} place place
        * @returns {Boolean} - If it's the author or not
        */
    function isOwner(place) {
        return place.author.name == usuari
    }
    return (
        <>
            <table className="bg-secondary">
                <tbody>
                    <tr>
                        <th>NOM</th>
                        <th>DESCRIPCIÓ</th>
                        <th>LATITUD</th>
                        <th>LONGITUD</th>
                        <th>VISIBILITAT</th>
                        <th>AUTORIA</th>
                        <th>FAVORITS</th>
                        <th>ACCIONS</th>

                    </tr>
                    { places.map (  (place)=> (
                        (isPublic(place) || isOwner(place)) &&
                            <tr key={place.id}>
                                <PlaceList place={place}/>
                            </tr>
                    ) ) }
                </tbody>
            </table>
        </>
    )
}