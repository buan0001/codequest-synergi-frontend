import FetchPages from "../components/FetchPages";
import { useSelector } from "react-redux";
import Editor from "../components/CKEditor";

export default function Processconsultation() {
  const prop = "proceskonsultation";
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
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
