import React, { useEffect } from 'react'
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
import { db } from "./firebase";
import {collection,getDocs,} from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { addtodo } from './slices/todoSlice';
import { addmark } from './slices/placeMarkSlice';


const App = () => {

  let [authToken, setAuthToken] = useState("");
  let [usuari, setUsuari] = useState("");
  let [idUser, setIdUser] = useState("");

  const todosCollectionRef =collection(db,"todos")
  const marksCollectionRef =collection(db,"placesMarks")
  const dispatch = useDispatch()

  const getTodos = async () => {
    const dades = await getDocs(todosCollectionRef);
    dades.docs.map((v) => {
      dispatch (addtodo(v.data()))
    });
  };

  const getMarks = async () => {
    const dadesMarks = await getDocs(marksCollectionRef);
    dadesMarks.docs.map((v) => {
      dispatch (addmark(v.data()))
    });
  };

  useEffect(() => {
    getTodos();
    getMarks();
  }, [usuari]);




  return (
    <>
      <UserContext.Provider value= { { usuari, setUsuari,authToken,setAuthToken,idUser, setIdUser }}>
        {authToken ? (
          <>
            <Header />
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<> <PlacesMenu/><PlacesGrid /> </>} />
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



