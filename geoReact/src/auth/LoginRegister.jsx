import React from 'react';
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const LoginRegister = () => {

    let [isLogin, setLogin] = useState(true);

    return (
        <div className="mh-100 d-flex justify-content-center align-items-center">
            {isLogin ? <Login setCanvi={setLogin} /> : <Register setCanvi={setLogin} />}
        </div>
    );
  
}

export default LoginRegister

