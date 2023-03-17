import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../userContext'

const useLogin = () => {

    let {authToken,setAuthToken} = useContext(UserContext)
    let {usuari, setUsuari} = useContext(UserContext)
    const [error, setError] = useState();

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
          if (resposta.success === true) {
            setAuthToken(myToken);
            setUsuari(resposta.user.email)
          }
        }
        else{
          setAuthToken("");
        }
    }

    const sendLogin = async (email, password) => {
        try {
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