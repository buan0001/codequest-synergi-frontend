// import { CVImage } from "../assets/CVImage";
import FetchPages from "../components/FetchPages";
import { useSelector } from "react-redux";
import Editor from "../components/CKEditor";

export default function CV() {
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  console.log("login boolean:", loggedIn);
  const prop = "cv";

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
