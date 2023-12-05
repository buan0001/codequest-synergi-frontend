import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../features/loginState";

export default function LogoutButton() {
const loggedIn = useSelector((state) => state.loginState.loggedIn);
const dispatch = useDispatch();

const handleLogout = (event) => {
  event.preventDefault();
  console.log("Logging in...");
  dispatch(logout());
};

if (loggedIn) {
    return (
      <div>
        <Button
          variant="outline-danger"
          onClick={() => {
            handleLogout(event);
          }}
        >
          Logout
        </Button>
      </div>
    );
  }
  return null; 
}