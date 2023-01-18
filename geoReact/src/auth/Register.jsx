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
    };

    //Preguntar por estas dos funciones que hacen
    return (
      <>
        <h1>Create your profile</h1>
        <form>
            Name:
            <input name="name" type="text" onChange={handleChange} />
            <br />
            E-mail
            <input name="email" type="email" onChange={handleChange} />
            <br />
            Password:
            <input name="password" type="password" onChange={handleChange} />
            <br />
            Confirm Password:
            <input name="password2" type="password" onChange={handleChange} />
            <br />
            <button
            onClick={(e) => {
                handleRegister(e);
            }}
            >
            CREATE ACCOUNT
            </button>
        </form>
        <button
          onClick={() => {
            setCanvi(true);
          }}
        >
          Already registered?
        </button>
      </>
    );
  }