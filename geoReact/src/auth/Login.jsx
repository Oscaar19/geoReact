import { useState } from "react";

export default function Login({ setCanvi }) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const sendLogin = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ email: email, password: password })
    })
      .then((data) => data.json())
      .then((resposta) => {
        console.log(resposta);
        if (resposta.success === true) {
          localStorage.setItem("token",resposta.authToken)
        }
        else{
          alert("El email o la contraseña no es correcto.")
        }
      })
      .catch((data) => {
        console.log(data);
        alert("Se ha producido un error.");
      });

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
        <div class="error alert alert-danger alert-dismissible fade"></div>
        <br />
        <button
          onClick={(e) => {
            sendLogin(e);
          }}
        >
        LOG IN
        </button>
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