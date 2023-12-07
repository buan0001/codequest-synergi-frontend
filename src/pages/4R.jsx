import { useSelector } from "react-redux";
import FetchPages from "../components/FetchPages";
import Editor from "../components/CKEditor";

export default function FourR() {
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  const prop = "4R ledelsesudvikling";

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
