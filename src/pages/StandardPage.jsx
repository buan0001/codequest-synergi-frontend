import InfoPages from "../components/InfoPages";
import { useSelector } from "react-redux";
import Editor from "../components/CKEditor";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function StandardPage({title}) {
  const [showEditor, setShowEditor] = useState(false);
  const [updatePage, setUpdatePage] = useState(false)
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
        {showEditor ? "Luk redigeringsvindue" : "Åbn redigeringsvindue"}
      </Button>
      {showEditor ? <Editor title={title} callUpdate={setUpdatePage} /> : <div></div>}
      <div className="p-4">
        <InfoPages title={title} update={updatePage} />
      </div>
    </div>
  ) : (
    <div className="p-4">
      <InfoPages title={title} />
    </div>
  );
}
