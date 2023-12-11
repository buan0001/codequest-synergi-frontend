import FetchPages from "../components/FetchPages";
import { useSelector } from "react-redux";
import Editor from "../components/CKEditor";
import { useState } from "react";

export default function Coaching(prop) {
  // console.log(prop);
  console.log(prop.title);
  const title = prop.title;
  const [showEditor, setShowEditor] = useState(false);
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  //   const prop = "anerkendende coaching";
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
      {showEditor ? <Editor title={title} /> : <div></div>}
      <div className="p-4">
        <FetchPages title={title} />
      </div>
    </div>
  ) : (
    <div className="p-4">
      <FetchPages title={title} />
    </div>
  );
}
