import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { setFilter } from '../slices/places/placeSlice';
import { UserContext } from '../userContext';

const PlacesMenu = () => {
    let {authToken,setAuthToken,usuari, setUsuari,idUser, setIdUser} = useContext(UserContext)
    const dispatch = useDispatch()
    const { formState, handleChange } = useForm({
        search: "",
    });
    const {search} = formState
    const {filter} = useSelector((state) => state.places)

    return (
        <Navbar className="bg-secondary">
            <Container>
                <Link to="/places/add"><Button variant="warning">Afegir entrada</Button></Link>
                <Nav className="me-auto">
                    <Link className="text-dark text-decoration-none text-uppercase" to="/places/grid">&nbsp;Grid&nbsp;&nbsp;</Link>
                    <Link className="text-dark text-decoration-none text-uppercase" to="/places">Llista&nbsp;&nbsp;</Link>
                    <Link className="text-dark text-decoration-none text-uppercase" to="/places/marks">Marcats&nbsp;&nbsp;</Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} name="search" onChange={handleChange}/>
                    </form>
                </Navbar.Collapse>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e) => {e.preventDefault;dispatch(setFilter({...filter,description:formState.search}))}}>&#128270;</button>
                <button className="btn btn-light my-2 my-sm-0" type="submit" onClick={(e) => {e.preventDefault;dispatch(setFilter({...filter,author:idUser}))}}>VEURE ELS MEUS PLACES</button>
                <button className="btn btn-light my-2 my-sm-0" type="submit" onClick={(e) => {e.preventDefault;dispatch(setFilter({...filter,author:"",description:""}))}}>RESTAURA FILTRES</button>
            </Container>
        </Navbar>
    )
}

export default PlacesMenu


