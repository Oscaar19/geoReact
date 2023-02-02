import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import {useParams } from 'react-router-dom';

const PlaceEdit = () => {
    const { id } = useParams();

    let {authToken,setAuthToken} = useContext(UserContext)
    let [formulari, setFormulari] = useState({});
    let [missatge, setMessage] = useState("");
    let [place,setPlace] = useState({})
    const [ isLoading, setIsLoading] = useState(true)
  
    useEffect (()=> {
      navigator.geolocation.getCurrentPosition( (pos )=> {
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

    const getPlace = async () => {
        try{
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer '  + authToken,

                },
                method: "GET",
            })
            const resposta = await data.json();
            if (resposta.success === true) {
                setFormulari(resposta.data);
                setIsLoading(false);

                console.log(resposta.data)
            }
            else console.log("There is not any place.")
        }catch(e) {
            console.log(e);
            alert("Se ha producido un error.");
        }
    }
    useEffect(() => {
        getPlace();
    }, [])
  
  
  
    const handleEditPlace = async (e) => {
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
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken 
          },
          method: "POST",
          body: formData
        });
        const resposta = await data.json();
        if (resposta.success === true) setMessage(resposta.message);
        else setMessage(resposta.message);
      }catch{
        console.log(data);
        alert("Se ha producido un error.");
      }
    };

    return (
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
                    handleEditPlace(e);
                }}
                >
                SUBMIT PLACE
                </button>
            </form>
        </div>
    )
}

export default PlaceEdit
