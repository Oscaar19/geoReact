import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../../userContext";
import useForm from "../../hooks/useForm";

const ReviewAdd = ({id,ferRefresh}) => {

  let {authToken,setAuthToken} = useContext(UserContext)
  let [missatge, setMessage] = useState("");



  const { formState, handleChange,onResetForm } = useForm({
    review: "",
  });
  const { review } = formState



  const handleAddReview = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("review", review);
    console.log(id)

    try{
      console.log("Entro al try")
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places/"+id+"/reviews", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken 
        },
        method: "POST",
        body: formData
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        setMessage("Ressenya afegida correctament.")
        ferRefresh()
      }
      else setMessage(resposta.message);
    }catch{
      console.log(data);
      alert("Se ha producido un error.");
    }
  };

  
  
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
          <button className="btn btn-primary" onClick={(e) => {handleAddReview(e);}}>CREATE REVIEW</button>
          <button className="btn btn-secondary" onClick={(e) => {e.preventDefault();onResetForm()}}>RESET</button>
        </form>
      </div>
    </>
  )
}

export default ReviewAdd