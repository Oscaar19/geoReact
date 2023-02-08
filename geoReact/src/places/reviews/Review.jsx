import React, { useState, useEffect,useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import TimeAgo from 'react-timeago'
import spanishStrings from 'react-timeago/lib/language-strings/es'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { UserContext } from "../../userContext";



const Review = ({review,deleteReview}) => {
    const formatter = buildFormatter(spanishStrings)
    let {usuari, setUsuari} = useContext(UserContext)

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
                            deleteReview(review.id)
                        })}>&nbsp;ESBORRAR&nbsp;&nbsp;</button>
                    :""
                    }                  
                </Card>
            </Container>
        </>
    )
}

export default Review