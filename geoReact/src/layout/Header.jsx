import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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
            if (resposta.success === true) {
                setUserName(resposta.user.name);
                setRoles(resposta.roles);
            }
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
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">GEOREACT</Navbar.Brand>
                <Nav className="me-auto">
                    <Link className="link-secondary text-decoration-none text-uppercase" to="/places">Llocs&nbsp;&nbsp;</Link>
                    <Link className="link-secondary text-decoration-none text-uppercase" to="/posts">Publicacions&nbsp;&nbsp;</Link>
                    <Link className="link-secondary text-decoration-none text-uppercase" to="/todos">Todos&nbsp;&nbsp;</Link>
                    <Link className="link-secondary text-decoration-none text-uppercase" to="/about">About</Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <span className="text-warning">{userName}&nbsp;</span>
                    
                    { roles.map (  (v)=> ( 
                        <span className="text-white" key={v}> {v} &nbsp;</span>
                    ) ) }
                    
                    <button className="justify-content-end" onClick={(e) => {
                            sendLogout(e);
                        }}>Logout
                    </button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  );
} 

