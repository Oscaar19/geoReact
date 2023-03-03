import React from 'react'
import LoginRegister from './auth/LoginRegister'
import { useState } from "react";
import { UserContext } from "./userContext";
import Header from './layout/Header';
import About from './About';
import Posts from './posts/Posts';
import NotFound from './NotFound';
import { Routes, Route } from "react-router-dom";
import Place from './places/Place';
import PlaceAdd from './places/PlaceAdd';
import PlacesGrid from './places/PlacesGrid';
import PlaceEdit from './places/PlaceEdit';
import PlacesList from './places/PlacesList';
import PlacesMenu from './places/PlacesMenu';
import ToDos from './todos/ToDos';
import PlaceMarks from './places/PlaceMarks';

const App = () => {

  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");

  return (
    <>
      <UserContext.Provider value= { { usuari, setUsuari,authToken,setAuthToken }}>
        {authToken ? (
          <>
            <Header />
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<About />} />
              <Route path="/about" element={<About />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/places/grid" element={<> <PlacesMenu/><PlacesGrid /> </>} />
              <Route path="/places" element={<> <PlacesMenu/><PlacesList /> </>} />
              <Route path="/places/edit/:id" element={<> <PlacesMenu/><PlaceEdit /></>} />
              <Route path="/places/add" element={<> <PlacesMenu/><PlaceAdd /></>} />
              <Route path="/places/:id" element={ <Place/> } />
              <Route path="/places/marks" element={<> <PlacesMenu/><PlaceMarks/></>} />
              <Route path="/todos" element={ <ToDos/>} />
            </Routes>
          </>
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>
    </>
  )
}

export default App



