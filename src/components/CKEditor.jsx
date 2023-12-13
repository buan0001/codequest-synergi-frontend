import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "../App.css";
import { useState } from "react";
import tryCatch from "./TryCatch";
import { Button } from "react-bootstrap";
import SuccessMessage from "./SuccessMessage";

function Edit({ title, callUpdate }) {
  const [textContent, setTextContent] = useState();
  // const [pageInfo, setPageInfo] = useState();
  // const [title, setTitle] = useState();
  const [editRef, setEditRef] = useState();
  // const [routeToUse, setRouteToUse] = useState("pages");
  const routeToUse = "pages"
  const editorReference = {
    firstGet(editor) {
      console.log("setting edit ref", editor);
      setEditRef(editor);
      this.editor = editor;
    },
  };

  async function fetchPage(editor) {
    // console.log("what to fetch",whatToFetch);
    console.log("route to use", routeToUse);
    try {
      const response = await tryCatch(`${routeToUse}/${title}`);
      // const response = await fetch(`http://localhost:3333/${routeToUse}/${whatToFetch}`);
      if (!response.ok) {
        throw new Error("Der opstod en fejl ved fetch");
      }
      const result = await response.json();
      console.log("FETCH DATA", result);
      setTextContent(result.body);
      // setPageInfo(result);
      // setTitle(result.title);

      console.log("EDIT REF", editRef);
      console.log("REFERENCE", editorReference);
      // editorReference.editor?.setData(result.body) || editRef?.setData(result.body);
      editor?.setData(result.body);
    } catch (error) {
      console.error("Der opstod en fejl ved indlæsning af data:", error);
    }
  }

  // async function postContent() {
  //   const data = { title: title, body: textContent };
  //   const response = await fetch(`pages`, ["POST",data])

  //   // const response = await fetch(`http://localhost:3333/pages`, {
  //   //   method: "POST",
  //   //   body: JSON.stringify(data),
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   // });
  //   console.log(response);
  // }

  async function patchContent() {
    // let propName = routeToUse === "pages" ? "body" : "resume";
    // const data = { [propName]: textContent, title: title };
    // console.log("DATA", data);
    // console.log("where to post", routeToUse);
    // console.log("page title:", title);
    const data = { body: textContent, title: title };
    const response = await tryCatch(routeToUse, "PATCH", data);
    if (response.ok) {
      SuccessMessage(`${title} blev redigeret!`);
      callUpdate(true)
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
          {/* <select name="" id="" onChange={(e) =>{setRouteToUse(e.target.value); console.log("where to post",routeToUse);} }>
            <option value="pages">Pages</option>
            <option value="books">Books</option>
            <option value="articles">Articles</option>
          </select> */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "85vw" }}>
              <CKEditor
                editor={ClassicEditor}
                config={{ toolbar: { removeItems: ["insertTable", "insertImage"] } }}
                onReady={async (editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                  // editorReference.firstGet(editor);
                  await fetchPage(editor);
                  // setEditRef(editor)
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


  // return (
  //   <>
  //     <div className="App">
  //       <h2>Placeholder</h2>
  //       <div style={{ color: "black" }}>
  //         <input
  //           type="text"
  //           placeholder="Name of page"
  //           value={title}
  //           onChange={(e) => {
  //             setTitle(e.target.value);
  //           }}
  //         ></input>
  //         <button
  //           onClick={() => {
  //             postContent(textContent);
  //           }}
  //         >
  //           Save page
  //         </button>
  //         <button
  //           onClick={() => {
  //             patchContent(textContent);
  //           }}
  //         >
  //           Update page
  //         </button>
  //         <button onClick={() => fetchPage(title)}>Get page with a given title</button>
  //         <select
  //           name=""
  //           id=""
  //           onChange={(e) => {
  //             setRouteToUse(e.target.value);
  //             console.log("where to post", routeToUse);
  //           }}
  //         >
  //           <option value="pages">Pages</option>
  //           <option value="books">Books</option>
  //           <option value="articles">Articles</option>
  //         </select>
  //         <div style={{ display: "flex", justifyContent: "center" }}>
  //           <div style={{ width: "85vw" }}>
  //             <CKEditor
  //               editor={ClassicEditor}
  //               config={{ toolbar: { removeItems: ["insertTable", "insertImage"] } }}
  //               onReady={async (editor) => {
  //                 // You can store the "editor" and use when it is needed.
  //                 console.log("Editor is ready to use!", editor);
  //                 editorReference.test(editor);

  //                 await fetchPage();
  //               }}
  //               onChange={(event, editor) => {
  //                 const data = editor.getData();
  //                 setTextContent(data);
  //               }}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <div style={{ border: "black 7px solid" }}></div>
  //     </div>
  //   </>
  // );