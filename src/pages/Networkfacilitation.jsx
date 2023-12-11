import FetchPages from "../components/InfoPages";
import { useSelector } from "react-redux";
import Editor from "../components/CKEditor";

export default function NetworkFacilitation() {
  const prop = "netværksfacilitering";
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
