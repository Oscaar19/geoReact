import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../userContext'

/**
    * This file makes all the operations related with Login.
    */

const useLogin = () => {

    let {authToken,setAuthToken,usuari, setUsuari,idUser, setIdUser} = useContext(UserContext)
    const [error, setError] = useState();


    /** 
     * @const checkAuthToken 
     * 
    */
    const checkAuthToken = async () => {
        let myToken =localStorage.getItem("authToken") || ""
        if(myToken.length > 0){
          const data = await fetch("https://backend.insjoaquimmir.cat/api/user", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer '  + myToken,
            },
            method: "GET",
          });

          const resposta = await data.json();
          console.log(resposta)
          if (resposta.success === true) {
            setAuthToken(myToken);
            setUsuari(resposta.user.email)
            setIdUser(resposta.user.id)
          }
        }
        else{
          setAuthToken("");
        }
    }

    /**
      * Makes the login with the given credentials and set a new authToken
      * @param {string} data data
      */
    const sendLogin = async (data) => {

        const { email,password} = data
        try {
          console.log("entro al sendLogin")
          const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email,password })
          });
          const resposta = await data.json();
          if (resposta.success === true) {
            setAuthToken(resposta.authToken);
            setUsuari(email)
            localStorage.setItem("authToken",resposta.authToken)
          }else {
            setError(resposta.message)
          }
        }catch{
          setError(data)

        };
    
    };

    useEffect(() => {
      checkAuthToken()
    }, []);

    return { sendLogin,error}
}

export default useLogin