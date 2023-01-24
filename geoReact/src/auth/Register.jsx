import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";

export default function Register({ setCanvi }) {
  let [formulari, setFormulari] = useState({});
  let [missatge, setMessage] = useState("");
  let {authToken,setAuthToken} = useContext(UserContext);

  const handleChange = (e) => {
      e.preventDefault();

      setMessage("")

      setFormulari({
        ...formulari,
        [e.target.name]: e.target.value
      });
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    let { name, password, password2, email } = formulari;

    
    if (password2 !== password) {
      setMessage("Els passwords han de coincidir");
      return false;
    }

    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/register", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        // Si els noms i les variables coincideix, podem simplificar
        body: JSON.stringify({ name, email, password })
      });
      const resposta = await data.json();
      if (resposta.success === true) setAuthToken(resposta.authToken);
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
          <h1>Create your profile</h1>
        </div>
        <form>
          <input className="sr-only" name="name" type="text" placeholder="Name" onChange={handleChange} />
          <br />
          <br />
          <input name="email" type="email" placeholder="E-mail" onChange={handleChange} />
          <br />
          <br />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <br />
          <br />
          <input name="password2" type="password" placeholder="Confirm Password" onChange={handleChange} />
          <br />
          <br />
          {missatge ? <div>{missatge}</div> : <></>}
          <br />
          <button className="btn btn-primary"
          onClick={(e) => {
            handleRegister(e);
          }}
          >
          CREATE ACCOUNT
          </button>
        </form>
        <button className="btn btn-link" 
            onClick={() => {
            setCanvi(true);
          }}
        >
          Already registered?
        </button>
      </div>
    </>
  );
}