import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import {useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { editPlace, getPlace } from "../slices/places/thunks";

const PlaceEdit = () => {
    const { id } = useParams();
    let dispatch = useDispatch()
    let {authToken,setAuthToken} = useContext(UserContext)
    let [formulari, setFormulari] = useState({});
    let { place = {}, isLoading=true, missatge=""} = useSelector((state) => state.places);
    let navigate = useNavigate()
   
  
    const handleChange = (e) => {
      e.preventDefault();
  
      missatge="";
  
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
 
  

    useEffect(() => {
      dispatch(getPlace(authToken,id))  
    }, [])

    useEffect (()=> {
      setFormulari({
        name: place.name,
        description: place.description,      
        longitude: place.longitude,      
        latitude: place.latitude,      
        visibility: place.visibility.id      
      })
      
    },[place])

    return (
      <>
        { isLoading ? (<div> Me cargo ....</div>) : ( 
          <div className="container">
              <div className="container">
                  <h1>Edit place</h1>
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
                      <option value="1" checked>Public</option>
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
                    dispatch(editPlace(id,authToken,formulari))
                    navigate(-1)
                  }}
                  >
                  SUBMIT PLACE
                  </button>
              </form>
          </div>
        )}
      </>
    )
}

export default PlaceEdit
