import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";

const initialState= {
  name: "",
  description: "",
  upload: "",

  visibility: 1
}

const PlaceAdd = () => {

  let {authToken,setAuthToken} = useContext(UserContext)

  let [formulari, setFormulari] = useState(initialState);
  let [missatge, setMessage] = useState("");

  
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

    setMessage("")

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



  const handleAddPlace = async (e) => {
    e.preventDefault();

    let {name,description,upload,latitude,longitude,visibility}=formulari;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken 
        },
        method: "POST",
        body: formData
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        setMessage("Place afegit correctament.");
        setFormulari(initialState)
        
        



      }
      else setMessage(resposta.message);
    }catch{
      console.log(data);
      alert("Se ha producido un error.");
    }
  };
  
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
              handleAddPlace(e);
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
