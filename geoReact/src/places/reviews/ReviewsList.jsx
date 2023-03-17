import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../../userContext";
import Review from './Review';
import ReviewAdd from './ReviewAdd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../slices/reviews/thunks";
import { setReviewsCount } from "../../slices/reviews/reviewSlice";

export default function ReviewsList({id,reviews_count}) {
    let {authToken,setAuthToken,usuari, setUsuari} = useContext(UserContext)
    const dispatch = useDispatch();
    const { reviews = [], page=0, isLoading=true, add=true, missatge="", reviewsCount=0} = useSelector((state) => state.reviews);

    
    

    useEffect(() => {
        dispatch(setReviewsCount(reviews_count))
        dispatch(getReviews(0, id, authToken,usuari));
        
    }, []);


    return (
        <>
            { add ? <ReviewAdd id={id}/>:""}
            <Container className="bg-secondary mw-100">
                <Row>
                    {reviews.map ((review) => ( 
                        <Col sm><Review review={review}/></Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}