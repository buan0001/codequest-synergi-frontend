// import { useAuth } from "./AuthContext";
import Button from "react-bootstrap/Button";

// export default function LogoutButton() {
//   const { loggedIn, handleLogout } = useAuth();

//   return loggedIn ? (
//     <div>
//       <Button variant="outline-danger" onClick={handleLogout}>
//         Logout
//       </Button>
//     </div>
//   ) : null;
// }

export default function LogoutButton() {

  return (
    <div>
      <Button variant="outline-danger">
        Logout
      </Button>
    </div>
  )
}

