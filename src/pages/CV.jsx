// import { CVImage } from "../assets/CVImage";
import FetchPages from "../components/FetchPages";
import { useSelector } from "react-redux";

export default function CV() {
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  console.log("login boolean:", loggedIn);
  const prop = "cv";
  return (
    <div className="p-4">
      <FetchPages title={prop} />
    </div>
  );
}
