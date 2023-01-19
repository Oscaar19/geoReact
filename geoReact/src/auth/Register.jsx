import { useState } from "react";

export default function Register({ setCanvi }) {
  let [formulari, setFormulari] = useState({});

  const handleChange = (e) => {
      e.preventDefault();

      setFormulari({
      ...formulari,
      [e.target.name]: e.target.value
      });
  };
  const handleRegister = (e) => {
    e.preventDefault();

    let { name, password, password2, email } = formulari;

    alert(
      "He enviat les Dades:  " +
      name +
      "/" +
      email +
      "/" +
      password +
      "/" +
      password2
    );
    if (password2 !== password) {
      alert("Els passwords han de coincidir");
      return false;
    }

    fetch("http://127.0.0.1:8000/api/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      // Si els noms i les variables coincideix, podem simplificar
      body: JSON.stringify({ name, email, password })
    })
      .then((data) => data.json())
      .then((resposta) => {
        console.log(resposta);
        if (resposta.success === true) {
          alert(resposta.authToken);
        }
      })
      .catch((data) => {
        console.log(data);
        alert("Se ha producido un error");
      });
  };

  //Preguntar por estas dos funciones que hacen
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