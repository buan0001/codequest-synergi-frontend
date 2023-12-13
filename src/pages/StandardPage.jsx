import InfoPages from "../components/InfoPages";
import { useSelector } from "react-redux";
import Editor from "../components/CKEditor";
import { useState } from "react";
import { Button } from "react-bootstrap";

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
      <Button
        onClick={() => {
          handleEditor();
        }}
      >
        Toggle editor
      </Button>
      {showEditor ? <Editor title={title} /> : <div></div>}
      <div className="p-4">
        <InfoPages title={title} />
      </div>
    </div>
  ) : (
    <div className="p-4">
      <InfoPages title={title} />
    </div>
  );
}
