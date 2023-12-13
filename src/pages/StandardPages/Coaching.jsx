import FetchPages from "../../components/InfoPages";
import { useSelector } from "react-redux";
import Editor from "../../components/CKEditor";
import { useState } from "react";

export default function Coaching() {
  console.log("coaching");
  const [showEditor, setShowEditor] = useState(true);
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  const prop = "anerkendende coaching";
  function handleEditor() {
    setShowEditor(!showEditor);
  }
  return loggedIn ? (
    <div>
      <button
        onClick={() => {
          handleEditor();
        }}
      >
        Toggle editor
      </button>
      {showEditor ? <Editor title={prop} /> : <div></div>}
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
