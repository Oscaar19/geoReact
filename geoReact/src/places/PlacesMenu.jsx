import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const PlacesMenu = () => {
  return (
    <Navbar className="bg-secondary">
        <Container>
            <Link to="/places/add"><Button variant="warning">Afegir entrada</Button></Link>
            <Nav className="me-auto">
                <Link className="text-dark text-decoration-none text-uppercase" to="/places/grid">&nbsp;Grid&nbsp;&nbsp;</Link>
                <Link className="text-dark text-decoration-none text-uppercase" to="/places">Llista&nbsp;&nbsp;</Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                </form>
            </Navbar.Collapse>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">&#128270;</button>
        </Container>
    </Navbar>
  )
}

export default PlacesMenu


