import Login from "../components/Login";
import { useSelector } from "react-redux";

export default function AdminLogin() {
  
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  console.log('login boolean:', loggedIn);
    return loggedIn ?  (
      <div>
        <h1>Du er nu logget ind som admin</h1>
        <p>Naviger til de andre sider for at redigere.</p>
      </div>
    ) : (
    <Login />
  );
}

