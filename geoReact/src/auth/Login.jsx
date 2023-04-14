import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
// import useForm from '../hooks/useForm'
import useLogin from "../hooks/useLogin";
import { useForm } from "react-hook-form";

export default function Login({ setCanvi }) {


  // const { formState, handleChange } = useForm({
  //   email: "",
  //   password: "",
  // });
  // const {email,password} = formState

  const { register, handleSubmit,  formState: { errors } } = useForm();
  let {sendLogin,error} = useLogin()
  const onSubmit = data => sendLogin(data)

  return (
    <>
      <div className="">
        <h1>Log In</h1>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
          <Form.Control type="email" {...register("email")} placeholder="name@example.com"/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" {...register("password")} placeholder="Password"/>
        </FloatingLabel>  
        <br />    
        <button onClick={handleSubmit(onSubmit)}>LOG IN</button>
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