import { useContext } from "react";
import { UserContext } from "../userContext";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export default function Footer() {
  let { authToken, setAuthToken } = useContext(UserContext);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <p className="text-white">
            Contacta amb GEOREACT
          </p>
        </Container>       
      </Navbar>
    </>
  );
} 