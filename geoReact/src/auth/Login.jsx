import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../userContext";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import useForm from '../hooks/useForm'
import useLogin from "../hooks/useLogin";

export default function Login({ setCanvi }) {


  const { formState, handleChange } = useForm({
    email: "",
    password: "",
  });
  const {email,password} = formState

  let {sendLogin,error} = useLogin()
  
  return (
    <>
      <div className="">
        <h1>Log In</h1>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control type="email" value={email} placeholder="name@example.com" onChange={handleChange} name="email"/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" value={password} placeholder="Password" onChange={handleChange} name="password" />
        </FloatingLabel>  
        <br />    
        <button onClick={(e) => {e.preventDefault;sendLogin(email,password)}}>LOG IN</button>
        <br />
        <br />
        {error ? <div>{error}</div> : <></>}
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