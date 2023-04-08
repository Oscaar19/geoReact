import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import { useDispatch, useSelector } from "react-redux";
import { addPlace } from "../slices/places/thunks";
import { useNavigate } from "react-router-dom";

const initialState= {
  name: "",
  description: "",
  upload: "",
  visibility: 1
}

const PlaceAdd = () => {

  let {authToken,setAuthToken} = useContext(UserContext)

  /**
    * This is the variable that has the current value of formulari and change it.
    * @type {useState}
    */
  let [formulari, setFormulari] = useState(initialState);

  /**
    * Variable missatge current value
    * @const {string}
    */
  let { missatge=""} = useSelector((state) => state.places);

  const dispatch = useDispatch();

  let navigate = useNavigate()

  
  useEffect (()=> {
    navigator.geolocation.getCurrentPosition( (pos )=> {

      //setLat(pos.coords.latitude)

      setFormulari({
        ...formulari,
        latitude :  pos.coords.latitude,
        longitude: pos.coords.longitude,
        visibility: 1
    
      })
    });  
  },[])


  const handleChange = (e) => {
    e.preventDefault();

    missatge=""

    if (e.target.type && e.target.type==="file")
      {
        setFormulari({
          ...formulari,
          [e.target.name] : e.target.files[0] 
        })
      } else {
        setFormulari({
          ...formulari,
          [e.target.name] : e.target.value
      })
    }
  }
  
  return (
    <>
      <div className="container bg-secondary mw-100 h-100 d-flex justify-content-center">
        <div>
          <div className="container">
            <h1>Add a place</h1>
          </div>
          <form>
            <input className="sr-only" name="name" value={formulari.name} type="text" placeholder="Name" onChange={handleChange} />
            <br />
            <br />
            <input name="description" value={formulari.description} type="text" placeholder="Description" onChange={handleChange} />
            <br />
            <br />
            <input name="upload" type="file" onChange={handleChange} />
            <br />
            <br />
            <input name="latitude" value={formulari.latitude} type="text" onChange={handleChange} />
            <br />
            <br />
            <input name="longitude" value={formulari.longitude} type="text" onChange={handleChange} />
            <br />
            <br />
            <select onChange={handleChange} name="visibility" value={formulari.visibility} className="form-control">
              <option value="1">Public</option>
              <option value="2">Private</option>
              <option value="3">Contacts</option>
            </select>
            <br />
            <br />
            {missatge ? <div>{missatge}</div> : <></>}
            <br />
            <button className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              dispatch(addPlace(formulari,authToken));
              navigate(-1)
            }}
            >
            CREATE PLACE
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PlaceAdd
