import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../userContext";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default function Login({ setCanvi }) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [missatge, setMessage] = useState("");


  let {authToken,setAuthToken} = useContext(UserContext)
  let {usuari, setUsuari} = useContext(UserContext)
  const sendLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        setAuthToken(resposta.authToken);
        setUsuari(email)
      }else {
        setMessage(resposta.message)
      }
    }catch{
      console.log(data);
      alert("Se ha producido un error.");
    };

  };
  
  return (
    <>
      <div className="w-50 p-3 align-middle">
        <h1>Log In</h1>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control type="email" placeholder="name@example.com" onChange={(e) => {setEmail(e.target.value);}}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value);}} />
        </FloatingLabel>  
        <br />    
        <button
          onClick={(e) => {
            sendLogin(e);
          }}
        >
        LOG IN
        </button>
        <br />
        {missatge ? <div>{missatge}</div> : <></>}
        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            setCanvi(false);
          }}
        >
          Not registered?
        </button>
      </div>
    </>
  );
}