import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import { UserContext } from "../userContext";
import { useDispatch, useSelector } from "react-redux";
import { addPlace } from "../slices/places/thunks";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


/**
  * Constant with the empty object to restart the form.
  * @const {Object}
  */
const initialState= {
  name: "",
  description: "",
  upload: "",
  visibility: 1
}

/**
    * This component makes the adding operations and show the form to send the information.
    */

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

  const {register,handleSubmit,formState: { errors },setValue} = useForm();

  const afegir = (data) => {
    const data2 = { ...data, upload: data.upload[0]}
    dispatch(addPlace(data2, authToken));
    navigate(-1)
  }


  
  useEffect (()=> {
    navigator.geolocation.getCurrentPosition( (pos )=> {

      setValue('latitude', pos.coords.latitude)
      setValue('longitude', pos.coords.longitude)

    });  
  },[])


  
  return (
    <>
      <div className="container bg-secondary mw-100 h-100 d-flex justify-content-center">
        <div>
          <div className="container">
            <h1>Add a place</h1>
          </div>
          <form>
            <input className="sr-only" type="text" placeholder="Name" {...register("name",{
                                                                        required: "Aquest camp és obligatori",
                                                                      })}/>
            {errors.name && <p>{errors.name.message}</p>}
            <br />
            <br />
            <input type="text" placeholder="Description" {...register("description",{
                                                            required: "Aquest camp és obligatori",
                                                          })}/>
            {errors.description && <p>{errors.description.message}</p>}
            <br />
            <br />
            <input type="file" {...register("upload",{
                                required: "Aquest camp és obligatori",
                              })}/>
            {errors.upload && <p>{errors.upload.message}</p>}
            <br />
            <br />
            <input type="text" {...register("latitude",{
                                  required: "Aquest camp és obligatori",
                                })}/>
            {errors.latitude && <p>{errors.latitude.message}</p>}
            <br />
            <br />
            <input type="text" {...register("longitude",{
                                  required: "Aquest camp és obligatori",
                                })}/>
            {errors.longitude && <p>{errors.longitude.message}</p>}
            <br />
            <br />
            <select className="form-control" {...register("visibility",{
                                                required: "Aquest camp és obligatori",
                                              })}>
              <option value="1">Public</option>
              <option value="2">Private</option>
              <option value="3">Contacts</option>
            </select>
            {errors.visibility && <p>{errors.visibility.message}</p>}
            <br />
            <br />
            {missatge ? <div>{missatge}</div> : <></>}
            <br />
            <button className="btn btn-primary"
            onClick={ handleSubmit(afegir)
              //navigate(-1)
            }
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
