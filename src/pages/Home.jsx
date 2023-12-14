import FetchPages from "../components/InfoPages";
import { useSelector } from "react-redux";
import Editor from "../components/CKEditor";


export default function Home() {
  // Checking if the user is logged in
  const loggedIn = useSelector((state) => state.loginState.loggedIn);

  const prop = "forside";

  // Returning different JSX based on the loggedIn state
  return loggedIn ? (
    <div>
      
      <Editor title={prop} />
      <div className="p-4">
        
        <FetchPages title={prop} />
      </div>
    </div>
  ) : (
    <div className="p-4">
      
      <FetchPages title={prop} />
    </div>
  );
}
