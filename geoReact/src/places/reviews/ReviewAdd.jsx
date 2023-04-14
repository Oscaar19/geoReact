import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../../userContext";
//import useForm from "../../hooks/useForm";
import { addReview } from "../../slices/reviews/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const ReviewAdd = ({id}) => {

  const { usuari,setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const { reviews = [], page=0, isLoading=true, add=true, missatge=""} = useSelector((state) => state.reviews);

  const dispatch = useDispatch()
  const { register, handleSubmit,  formState: { errors } } = useForm();
  const onSubmit = data => dispatch(addReview(data,authToken,id))


  
  
  return (
    <>
      <div className="container">
        <div className="container">
          <h1>Add a review</h1>
        </div>
        <form>
          <textarea rows={7} className="form-control" type="text" placeholder="Write your review here" {...register("review",{
                                                                                                          required: "Aquest camp és obligatori",
                                                                                                          minLength: {value: 20,message: "La ressenya ha de tenir com a minim 20 caracters"},
                                                                                                          maxLength: {value: 200,message: "La ressenya ha de tenir com a màxim 200 caràcters"},                                                                                              
                                                                                                        })}/>
          {errors.review && <p>{errors.review.message}</p>}
          <br />
          <br />
          {missatge ? <div>{missatge}</div> : <></>}
          <br />
          <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>CREATE REVIEW</button>
          <button className="btn btn-secondary" onClick={(e) => {e.preventDefault();onResetForm()}}>RESET</button>
        </form>
      </div>
    </>
  )
}

export default ReviewAdd