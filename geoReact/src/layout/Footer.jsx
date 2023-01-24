import { useContext } from "react";
import { UserContext } from "../userContext";

export default function Footer() {
  let { authToken, setAuthToken } = useContext(UserContext);

  return (
    <>
      <div>
        Aquest es el footer usuari Token: <strong>{authToken}</strong>
      </div>
      <hr />
    </>
  );
} 