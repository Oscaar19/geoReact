import React from 'react';
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const LoginRegister = () => {

    let [isLogin, setLogin] = useState(true);

    return (
        <div className="App">
            {isLogin ? <Login setCanvi={setLogin} /> : <Register setCanvi={setLogin} />}
        </div>
    );
  
}

export default LoginRegister

//Preguntar porque en el login se hace por cada input un estado, y en el register hay un solo input.