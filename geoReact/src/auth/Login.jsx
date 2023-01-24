import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../userContext";

export default function Login({ setCanvi }) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [missatge, setMessage] = useState("");


  let {authToken,setAuthToken} = useContext(UserContext)
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
      if (resposta.success === true) setAuthToken(resposta.authToken);
      else setMessage(resposta.message);
    }catch{
      console.log(data);
      alert("Se ha producido un error.");
    };

    alert("He enviat les Dades:  " + email + "/" + password);
  };
  
  return (
    <>
      <h1>Log In</h1>
      <form>
        Email:
        <input name="email" type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        Password:{" "}
        <input name="password" type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="error alert alert-danger alert-dismissible fade"></div>
        <br />
        <button
          onClick={(e) => {
            sendLogin(e);
          }}
        >
        LOG IN
        </button>
        {missatge ? <div>{missatge}</div> : <></>}
        <br />
      </form>
      <button
        className="btn btn-primary"
        onClick={() => {
          setCanvi(false);
        }}
      >
        Not registered?
      </button>
    </>
  );
}