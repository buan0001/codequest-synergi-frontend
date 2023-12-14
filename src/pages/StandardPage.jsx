import InfoPages from "../components/InfoPages";
import { useSelector } from "react-redux";
import Editor from "../components/CKEditor";
import { useState } from "react";
import { Button } from "react-bootstrap";


export default function StandardPage({ title }) {
  const [showEditor, setShowEditor] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  
  // Checking if the user is logged in
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  
  // Function to handle the editor visibility
  function handleEditor() {
    setShowEditor(!showEditor);
  }
  
  // Rendering the component based on the user's login status
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
    // Rendering the InfoPages component if the user is not logged in
    <div className="p-4">
      <InfoPages title={title} />
    </div>
  );
}
