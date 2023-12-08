// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { useState, useEffect } from "react";
// import tryCatch from "../TryCatch";

// export default function BooksArticlesForm() {
//   const [data, setData] = useState("");
//   const [isPay, setIsPay] = useState(false);
//   const [newPost, setNewPost] = useState("");
//   const [authorField, setAuthorField] = useState([0]);
//   const [bookOrArticle, setBookOrArticle] = useState("articles");
//   const [formData, setFormData] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       const response = await tryCatch(bookOrArticle);
//       console.log("response", response);
//       if (response) {
//         setData(response);
//       }
//     }

//     fetchData();
//   }, [newPost, bookOrArticle]); // Dependency that decides how many times the effect runs

//   function changeBookArticle(e) {
//     // console.log("option changed",e.target.value);
//     setBookOrArticle(e.target.value);
//   }

//   function changePay(e) {
//     setIsPay(e.target.value === "true");
//   }

//   async function handleSubmit(form) {
//     console.log("form,", form);
//     // console.log("form entries",form.entries);
//     console.log("book or article?", bookOrArticle);
//     const newArticleOrBook = {
//       title: form.title,
//       releaseYear: form.releaseYear,
//       publisher: form.publisher,
//       authors: authorField.map(field => {
//         return { firstName: form["firstName" + field], lastName: form["lastName" + field] };
//       }),
//       link: form.link,
//       isPay: isPay,
//       resume: form.resume,
//     };
//     console.log("new article", newArticleOrBook);
//     const response = await tryCatch(bookOrArticle, {
//       method: "POST",
//       body: JSON.stringify(newArticleOrBook),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     // console.log(result);
//     if (response) {
//       setNewPost(response);
//     }
//   }

//   return (
//     <div>
//       <Form
//         style={{
//           display: "flex",
//           padding: "5px",
//           gap: "10px",
//           flexDirection: "column",
//         }}
//         onSubmit={e => {
//           e.preventDefault();
//           console.log("target", new FormData(e.target));
//           const formEntries = Object.fromEntries(new FormData(e.target).entries());
//           console.log("form entries", formEntries);
//           handleSubmit(formEntries);
//         }}
//         // onFocus={(e) =>console.log("on focus event",e)}
//         onChange={e => {
//           const element = e.target;
//           if (element.type == "text") {
//             if (!element.style.minWidth) {
//               element.style.minWidth = "200px";
//               element.style.maxWidth = "80vw";
//             }
//             element.style.width = element.value.length + "ch";
//           }
//         }}
//       >
//         <select
//           className="justify-content-center"
//           style={{ width: "30vw" }}
//           onChange={e => {
//             changeBookArticle(e);
//           }}
//         >
//           <option value="articles">Artikel</option>
//           <option value="books">Bog</option>
//         </select>

//         <div>
//           {/* Titel, udgivelsesår, udgiver */}
//           <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
//             <Form.Label column sm={2}>
//               Titel
//             </Form.Label>
//             <Col sm={3}>
//               <Form.Control type="text" name="title" className="bg-light" placeholder="Titel" required />
//             </Col>
//           </Form.Group>

//           <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
//             <Form.Label column sm={2}>
//               Udgivelsesår
//             </Form.Label>
//             <Col sm={3}>
//               <Form.Control type="number" name="releaseYear" className="bg-light" placeholder="Årstal" required />
//             </Col>
//           </Form.Group>

//           <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
//             <Form.Label column sm={2}>
//               Udgiver
//             </Form.Label>
//             <Col sm={3}>
//               <Form.Control type="text" name="publisher" className="bg-light" placeholder="Navn på udgiver" required />
//             </Col>
//           </Form.Group>
//         </div>

//         <div>
//           {authorField.map((field, index) => {
//             console.log("author field", authorField);
//             return (
//               <div key={field}>
//                 <div>
//                   <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
//                     <Form.Label column sm={2}>
//                       Forfatter {index + 1}:
//                     </Form.Label>
//                     <Col sm={3}>
//                       <Form.Control type="text" name={"firstName" + index} className="bg-light" placeholder="Fornavn" required />
//                     </Col>
//                     <Col sm={3}>
//                       <Form.Control type="text" name={"lastName" + index} className="bg-light" placeholder="Efternavn" required />
//                     </Col>
//                   </Form.Group>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="container">
//           <div className="row">
//             <div className="p-2 col-sm d-flex justify-content-center space-between">
//               <Button
//                 onClick={() => {
//                   setAuthorField([...authorField, authorField.length]);
//                 }}
//                 variant="outline-secondary"
//                 className="mx-2"
//               >
//                 Tilføj ny forfatter
//               </Button>
//               <Button
//                 onClick={() => {
//                   const newField = [...authorField];
//                   if (newField.length > 1) {
//                     newField.pop();
//                     setAuthorField(newField);
//                   }
//                 }}
//                 variant="outline-secondary"
//                 className="mx-2"
//               >
//                 Fjern seneste forfatter
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Link til artikel */}
//         <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
//           <Form.Label column sm={2}>
//             Link til læsning/køb
//           </Form.Label>
//           <Col sm={3}>
//             <Form.Control type="text" name="link" className="bg-light" placeholder="Link" defaultValue={formData.link || ""} />
//           </Col>
//         </Form.Group>

//         <Form.Group as={Row} className="mb-3 justify-content-center">
//           <Form.Label column sm={5}>
//             {/* Betalingsartikel? <select type="select" name="pay" /> */}
//             Betalt adgang?
//             <select
//               defaultValue={formData.pay || ""}
//               name=""
//               id=""
//               onChange={e => {
//                 changePay(e);
//               }}
//             >
//               <option value="false">Gratis</option>
//               <option value="true">Betalt</option>
//             </select>
//             {/* Betalingsartikel? <input type="checkbox" name="pay" /> */}
//           </Form.Label>
//         </Form.Group>

//         <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupText">
//           <Form.Label column sm={1}>
//             Kort resume
//           </Form.Label>
//           <Col sm={4}>
//             <Form.Control as="textarea" className="bg-light" name="resume" rows={4} defaultValue={formData.resume || ""} />
//           </Col>
//         </Form.Group>

//         <Form.Group className="mb-3 text-center" controlId="formBasicButton">
//           <Button type="submit" variant="outline-secondary" className="mx-2">
//             Opret artikel
//           </Button>
//         </Form.Group>
//       </Form>
//     </div>
//   );
// }
