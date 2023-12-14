import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../features/LoginState";

export default function Logout() {
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  if (loggedIn) {
    // Render the logout button if the user is logged in
    return (
      <div>
        <Button
          variant="outline-danger"
          onClick={(event) => {
            handleLogout(event);
          }}
        >
          Log ud
        </Button>
      </div>
    );
  }
  // Return null if the user is not logged in
  return null;
}
