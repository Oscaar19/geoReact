import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../../userContext";
import useForm from "../../hooks/useForm";
import { addReview } from "../../slices/reviews/thunks";
import { useDispatch, useSelector } from "react-redux";

const ReviewAdd = ({id}) => {

  const { usuari,setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const { reviews = [], page=0, isLoading=true, add=true, missatge=""} = useSelector((state) => state.reviews);

  const dispatch = useDispatch()



  const { formState, handleChange,onResetForm } = useForm({
    review: "",
  });
  const { review } = formState


  
  
  return (
    <>
      <div className="container">
        <div className="container">
          <h1>Add a review</h1>
        </div>
        <form>
          <textarea rows={7} className="form-control" name="review" value={review} type="text" placeholder="Write your review here" onChange={handleChange} />
          <br />
          <br />
          {missatge ? <div>{missatge}</div> : <></>}
          <br />
          <button className="btn btn-primary" onClick={(e) => {e.preventDefault(); dispatch(addReview(review,id,authToken))}}>CREATE REVIEW</button>
          <button className="btn btn-secondary" onClick={(e) => {e.preventDefault();onResetForm()}}>RESET</button>
        </form>
      </div>
    </>
  )
}

export default ReviewAdd