import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../../userContext";
import Review from './Review';
import ReviewAdd from './ReviewAdd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ReviewsList({place}) {
    let {authToken,setAuthToken} = useContext(UserContext)
    let [reviews,setReviews] = useState([])
    let [missatge, setMessage] = useState("");
    let [refresh,setRefresh] = useState(false)
    let [add,setAdd]=useState(true)
    let {usuari, setUsuari} = useContext(UserContext)
    let id = place.id

    const getReviews = async () => {
        
        try{
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id+"/reviews", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer '  + authToken,
                },
                method: "GET",
            })
            const resposta = await data.json();
            if (resposta.success === true) {
                setReviews(resposta.data);
                console.log(resposta.data)
                resposta.data.map ((v) => { 
                    if (v.user.email == usuari){
                        setAdd(false)
                    }
                })

            }
            else console.log("There aren't reviews.")
        }catch(e) {
            console.log(e);
            alert("Se ha producido un error.");
        }
    }

    const deleteReview = async (reviewId) => {
        try{
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id +"/reviews/"+reviewId, {
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
                setAdd(true)
            }
            setMessage(resposta.message)
        }catch(e) {
            console.log(e);
            alert("Se ha producido un error.");
        }
    }

    const ferRefresh = () =>{
        setRefresh(!refresh);
    }

    useEffect(() => {
        getReviews();
    }, [refresh])


    return (
        <>
            { add ? <ReviewAdd id={id} ferRefresh={ferRefresh}/>:""}
            <Container className="bg-secondary mw-100">
                <Row>
                    {reviews.map ((review) => ( 
                        <Col sm><Review review={review} deleteReview={deleteReview}/></Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}