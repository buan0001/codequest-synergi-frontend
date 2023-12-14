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
  return null;
}
