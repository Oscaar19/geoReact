import React from 'react'
import LoginRegister from './auth/LoginRegister'
import { useState } from "react";
import { UserContext } from "./userContext";
import Header from './layout/Header';
import Footer from './layout/Footer';
import About from './About';
import Places from './places/Places';
import Posts from './posts/Posts';
import NotFound from './NotFound';
import { Routes, Route } from "react-router-dom";


const App = () => {

  let [authToken, setAuthToken] = useState("");

  return (
    <>
      <UserContext.Provider value={{ authToken, setAuthToken }}  >
        {authToken ? (
          <>
            <Header />
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<About />} />
              <Route path="/places" element={<Places />} />
              <Route path="/about" element={<About />} />
              <Route path="/posts" element={<Posts />} />
            </Routes>
            <Footer/>
          </>
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>
    </>
  )
}

export default App



