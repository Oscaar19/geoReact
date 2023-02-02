import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import PlaceList from './PlaceList';

export default function PlacesList() {
    let {authToken,setAuthToken} = useContext(UserContext)
    let [places,setPlaces] = useState([])

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
                        <tr key={place.id}>
                            <PlaceList place={place}/>
                            <hr />
                        </tr>
                    ) ) }
                </tbody>
            </table>
        </>
    )
}