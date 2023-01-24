import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';

export default function Header() {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [ userName, setUserName ] = useState("");
  let [ roles, setRoles] = useState([]);

  const sendLogout = async (e) => {
    e.preventDefault();
    try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/logout", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer '  + authToken,
            },
            method: "POST",
        });
        const resposta = await data.json();
        if (resposta.success === true) setAuthToken("")
        else console.log("N logout")
    }catch{
        console.log(data);
        alert("Se ha producido un error.")
    }
    
  };

    const getUserName = async (e) => {
        try{
            const data = await fetch("https://backend.insjoaquimmir.cat/api/user", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer '  + authToken,
                },
                method: "GET",
            })
            const resposta = await data.json();
            if (resposta.success === true) setUserName(resposta.user.name);
            else console.log("No user found")
        }catch{
            console.log(data);
            alert("Se ha producido un error.");
        }
    }
    useEffect(() => {
        getUserName();
    }, [])
    

  return (
    <>
        <div>
            <Link to="/places">Llocs </Link>
            <Link to="/posts">Publicacions </Link>
            <Link to="/about">About </Link>
            <p>{userName}</p>
            { roles.map (  (v)=> ( 
                <span key={v}> {v} </span>
            ) ) }
            <button onClick={(e) => {
                    sendLogout(e);
                }}>Logout
            </button>
        </div>
        <hr />
    </>
  );
} 
