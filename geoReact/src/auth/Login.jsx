import { useState } from "react";

export default function Login({ setCanvi }) {
    let [name, setName] = useState("");
    let [password, setPassword] = useState("");

    const sendLogin = (e) => {
        e.preventDefault();

        alert("He enviat les Dades:  " + name + "/" + password);
    };
    return (
      <>
        <h1>Log In</h1>
        <form>
            Name:
            <input
            name="name"
            type="text"
            onChange={(e) => {
                setName(e.target.value);
            }}
            />
            <br />
            Password:{" "}
            <input
            name="password"
            type="password"
            onChange={(e) => {
                setPassword(e.target.value);
            }}
            />
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
          onClick={() => {
            setCanvi(false);
          }}
        >
          Not registered?
        </button>
      </>
    );
  }