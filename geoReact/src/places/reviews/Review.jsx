import React, { useState, useEffect,useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import TimeAgo from 'react-timeago'
import spanishStrings from 'react-timeago/lib/language-strings/es'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { UserContext } from "../../userContext";
import { useDispatch, useSelector } from 'react-redux';
import { delReview } from '../../slices/reviews/thunks';



const Review = ({review}) => {
    const formatter = buildFormatter(spanishStrings)
    const { usuari,setUsuari, authToken, setAuthToken } = useContext(UserContext);
    const { reviews = [], page=0, isLoading=true, add=true, missatge=""} = useSelector((state) => state.reviews);

    const dispatch = useDispatch()

    function isOwner(review) {
        return review.user.email == usuari
    }

    return (
        <>
            <Container className="mw-100 mh-100 align-items-center">
                <br />
                <Card className="bg-dark text-white" style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Review de: {review.user.name}</Card.Title>
                        <br />
                        <Card.Text>{review.review}</Card.Text>
                        <TimeAgo date={review.created_at} formatter={formatter} />
                    </Card.Body> 
                    {(isOwner(review)) ? 
                        <button onClick={(() => {
                            dispatch( delReview(review,authToken))
                        })}>&nbsp;ESBORRAR&nbsp;&nbsp;</button>
                    :""
                    }                  
                </Card>
            </Container>
        </>
    )
}

export default Review