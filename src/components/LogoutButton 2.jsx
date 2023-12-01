import { useAuth } from "./AuthContext";
import Button from "react-bootstrap/Button";

function LogoutButton() {
  const { loggedIn, handleLogout } = useAuth();

  return loggedIn ? (
    <div>
      <Button variant="outline-danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  ) : null;
}

export default LogoutButton;
