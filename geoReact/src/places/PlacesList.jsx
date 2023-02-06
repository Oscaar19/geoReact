import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import PlaceList from './PlaceList';

export default function PlacesList() {
    let {authToken,setAuthToken} = useContext(UserContext)
    let [places,setPlaces] = useState([])
    let [missatge, setMessage] = useState("");
    let [refresh,setRefresh] = useState(false)
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
            }
            else console.log("There is not any place.")
        }catch(e) {
            console.log(e);
            alert("Se ha producido un error.");
        }
    }

    const deletePlace = async (e,id) => {
        e.preventDefault();
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
                setRefresh(!refresh);
            }
            setMessage(resposta.message)
        }catch(e) {
            console.log(e);
            alert("Se ha producido un error.");
        }
    }

    useEffect(() => {
        getPlaces();
        deletePlace()
    }, [refresh])

    function isPublic(place) {
        return place.visibility.name == "public"
    }

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
                                <PlaceList place={place} deletePlace={deletePlace}/>
                            </tr>
                    ) ) }
                </tbody>
            </table>
        </>
    )
}