import FetchPages from "../../components/InfoPages";
import { useSelector } from "react-redux";
import Editor from "../../components/CKEditor";

export default function InternalTrainingCourses() {
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  const prop = "interne uddannelsesforløb";

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
