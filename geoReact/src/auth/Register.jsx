import { useState } from "react";
import { useContext } from "react";
//import useForm from "../hooks/useForm";
import { UserContext } from "../userContext";
import { useForm } from "react-hook-form";

export default function Register({ setCanvi }) {
  let [missatge, setMessage] = useState("");
  let {authToken,setAuthToken} = useContext(UserContext);

  const { register, handleSubmit,  formState: { errors } } = useForm();
  const onSubmit = data => handleRegister(data)



  const handleRegister = async (data) => {
    
    const { name, password, password2, email } = data

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
          <input className="sr-only" type="text" placeholder="Name" {...register("name",{
                                        required: "Aquest camp és obligatori",
                                        minLength: {value: 8,message: "Introdueix un nom i cognom separats per un espai."},
                                        pattern:{value:/^[a-zA-Z]+(\s[a-zA-Z]+)+$/,message: "El nom i cognom no pot contenir numeros."}
                                      })}/>
          {errors.name && <p>{errors.name.message}</p>}
          <br />
          <br />
          <input type="email" placeholder="E-mail" {...register("email",{
                                                      required: "Aquest camp és obligatori",
                                                      pattern:{value:/^\w+@(fp\.)?insjoaquimmir\.cat$/,message: "Introdueix una adreça de correu vàlida."}
                                                    })}/>
          {errors.email && <p>{errors.email.message}</p>}
          <br />
          <br />
          <input  type="password" placeholder="Password" {...register("password",{
                                                            required: "Aquest camp és obligatori",
                                                            pattern:{value:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,message: "La contrasenya ha de contenir 8 caracters amb almenys una majúscula, una minúscula, un número i un caracter especial."}
                                                          })}/>
          {errors.password && <p>{errors.password.message}</p>}
          <br />
          <br />
          <input type="password" placeholder="Confirm Password" {...register("password2",{
                                                                  required: "Aquest camp és obligatori",
                                                                  pattern:{value:/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,message: "La contrasenya ha de contenir 8 caracters amb almenys una majúscula, una minúscula, un número i un caracter especial."}
                                                                })}/>
          {errors.password2 && <p>{errors.password2.message}</p>}
          <br />
          <br />
          {missatge ? <div>{missatge}</div> : <></>}
          <br />
          <button className="btn btn-primary" onClick={handleSubmit(onSubmit)}>CREATE ACCOUNT</button>
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