import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "../App.css";
import { useState } from "react";
import HTTPErrorHandling from "./TryCatch";
import { Button } from "react-bootstrap";
import SuccessMessage from "./SuccessMessage";

function Edit({ title, callUpdate }) {
  const [textContent, setTextContent] = useState();
  const routeToUse = "pages";

  async function fetchPage(editor) {
    console.log("route to use", routeToUse);
    try {
      const response = await HTTPErrorHandling(`${routeToUse}/${title}`);
      if (!response.ok) {
        throw new Error("Der opstod en fejl ved fetch");
      }
      const result = await response.json();
      console.log("FETCH DATA", result);
      setTextContent(result.body);
      editor?.setData(result.body);
    } catch (error) {
      console.error("Der opstod en fejl ved indlæsning af data:", error);
    }
  }

  async function patchContent() {
    const data = { body: textContent, title: title };
    const response = await HTTPErrorHandling(routeToUse, "PATCH", data);
    if (response.ok) {
      SuccessMessage(`${title} blev redigeret!`);
      callUpdate(true);
    }

    console.log(response);
  }

  return (
    <>
      <div className="App">
        <h2>Rediger {title}</h2>
        <div style={{ color: "black" }}>
          <Button
            onClick={() => {
              patchContent(textContent);
            }}
          >
            Opdater side
          </Button>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "85vw" }}>
              <CKEditor
                editor={ClassicEditor}
                config={{ toolbar: { removeItems: ["insertTable", "insertImage"] } }}
                onReady={async (editor) => {
                  await fetchPage(editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setTextContent(data);
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ border: "black 7px solid" }}></div>
      </div>
    </>
  );
}

export default Edit;
