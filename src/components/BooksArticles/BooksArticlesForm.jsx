import { useState } from "react";
import Button from "react-bootstrap/Button";
// import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import tryCatch from "../components/TryCatch";
import tryCatch from "../TryCatch";

export default function BookArticleForm({ formData, newSubmit, methodToUse = "POST", bookOrArticle, setShowModal }) {
  //   const [changedPost, setChangedPost] = useState("");
  //   const [showBorA, setShowBorA] = useState("articles");
  //   const [isPay, setIsPay] = useState(false);
  const [formCreateType, setFormCreateType] = useState("articles");
  const [authorField, setAuthorField] = useState(
    methodToUse === "POST"
      ? [{ placement: 0 }]
      : formData.authors.map((author, index) => {
          return { firstName: author.firstName, lastName: author.lastName, placement: index };
        })
  );
  // const [formData, setFormData] = useState("");
  // const thingToMap = methodToUse === "POST" ? authorField : formData.authors;
  // if (methodToUse === "PATCH"){setAuthorField(formData.authors.map(author => {
  //   return {firstName: author.firstName, lastName: author.lastName}
  // }))}
  console.log("methodToUse", methodToUse);

  async function handleSubmit(form) {
    console.log("author field", authorField);
    console.log("form data", formData);
    // console.log("PROPS", props);
    console.log("form,", form);
    console.log("method to use,", methodToUse);
    // console.log("book or article?", formCreateType);
    const newArticleOrBook = {
      title: form.title,
      releaseYear: form.releaseYear,
      publisher: form.publisher,
      authors: authorField.map((field, index) => {
        return { firstName: authorField[index].firstName, lastName: authorField[index].lastName };
      }),
      link: form.link,
      isPay: form.isPay,
      resume: form.resume,
    };
    console.log("new article", newArticleOrBook);
    let path = form.bookOrArticle;
    // if (methodToUse === "PATCH"){newArticleOrBook._id = d}
    // let path = methodToUse === "POST" ? form.bookOrArticle : `${form.bookOrArticle}/${formData._id}`;
    console.log("path", path);
    const response = await tryCatch(path + "/" + formData._id, methodToUse, newArticleOrBook);
    console.log(response);
    if (response.ok) {
      newSubmit(response);
      setShowModal(false)
    }
  }

  return (
    <div className="mt-4">
      <h2 className="text-center">{methodToUse === "POST" ? "Tilføj bog eller artikel" : "Rediger"}</h2>
      <Form
        style={{
          display: "flex",
          padding: "5px",
          gap: "10px",
          flexDirection: "column",
        }}
        className="bg-muted"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("target", new FormData(e.target));
          const formEntries = Object.fromEntries(new FormData(e.target).entries());
          console.log("form entries", formEntries);
          handleSubmit(formEntries);
        }}
        onChange={(e) => {
          const element = e.target;
          if (element.type == "text") {
            if (!element.style.minWidth) {
              element.style.minWidth = "200px";
              element.style.maxWidth = "80vw";
            }
            element.style.width = element.value.length + "ch";
          }
        }}
      >
        <div>
          {/* Titel, udgivelsesår, udgiver */}
          <Form.Group as={Row} className="mb-3 justify-content-center">
            <Form.Select
              defaultValue={bookOrArticle}
              name="bookOrArticle"
              className="justify-content-center"
              style={{ width: "30vw" }}
              onChange={(e) => {
                console.log("default value", bookOrArticle);
                setFormCreateType(e.target.value);
              }}
            >
              <option value="articles">Artikel</option>
              <option value="books">Bog</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
            <Form.Label column sm={2}>
              Titel
            </Form.Label>
            <Col sm={3}>
              <Form.Control type="text" name="title" className="bg-light" placeholder="Titel" required defaultValue={formData.title} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
            <Form.Label column sm={2}>
              Udgivelsesår
            </Form.Label>
            <Col sm={3}>
              <Form.Control type="number" name="releaseYear" className="bg-light" placeholder="Årstal" required defaultValue={formData.releaseYear} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
            <Form.Label column sm={2}>
              Udgiver
            </Form.Label>
            <Col sm={3}>
              <Form.Control type="text" name="publisher" className="bg-light" placeholder="Navn på udgiver" required defaultValue={formData.publisher} />
            </Col>
          </Form.Group>
        </div>

        <div>
          {authorField.map((field, index) => {
            console.log("mapping");
            return (
              <div key={index}>
                <div>
                  <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
                    <Form.Label column sm={2}>
                      Forfatter {index + 1}:
                    </Form.Label>
                    <Col sm={3}>
                      <Form.Control
                        type="text"
                        id={index}
                        name={"firstName" + index}
                        className="bg-light"
                        placeholder="Fornavn"
                        defaultValue={formData === "" ? "" : formData.authors[index]?.firstName}
                        onChange={(e) => {
                          const value = e.target.value;
                          const newArray = [...authorField];
                          newArray[index].firstName = value;
                          setAuthorField(newArray);
                        }}
                        value={[...authorField][index].firstName}
                        required
                      />
                      <Button
                        id={index}
                        onClick={(e) => {
                          const id = Number(e.target.id);
                          console.log("ID", id);
                          const newField = authorField.filter((entry) => {
                            // console.log("entry.placement", entry);
                            return entry.placement !== id;
                          });
                          newField.forEach((entry, index) => {
                            // console.log("index", index);
                            entry.placement = index;
                          });
                          // console.log("newField", newField);
                          // console.log("newField length", newField.length);
                          if (newField.length !== 0) {
                            // newField.pop();
                            setAuthorField(newField);
                          }
                        }}
                        variant="outline-danger"
                        className="mx-2"
                      >
                        Fjern forfatter
                      </Button>
                    </Col>
                    <Col sm={3}>
                      <Form.Control
                        type="text"
                        name={"lastName" + index}
                        className="bg-light"
                        placeholder="Efternavn"
                        defaultValue={formData === "" ? "" : formData.authors[index]?.lastName}
                        onChange={(e) => {
                          const value = e.target.value;
                          const newArray = [...authorField];
                          newArray[index].lastName = value;
                          setAuthorField(newArray);
                        }}
                        value={[...authorField][index].lastName}
                        required
                      />
                    </Col>
                  </Form.Group>
                </div>
              </div>
            );
          })}
        </div>

        <div className="container">
          <div className="row">
            <div className="p-2 col-sm d-flex justify-content-center space-between">
              <Button
                onClick={() => {
                  setAuthorField([...authorField, { placement: authorField.length }]);
                }}
                variant="primary"
                className="mx-2"
              >
                Tilføj ny forfatter
              </Button>
              {/* <Button
                onClick={() => {
                  const newField = [...authorField];
                  if (newField.length > 1) {
                    newField.pop();
                    setAuthorField(newField);
                  }
                }}
                variant="outline-secondary"
                className="mx-2"
              >
                Fjern seneste forfatter
              </Button> */}
            </div>
          </div>
        </div>

        {/* Link til artikel */}
        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
          <Form.Label column sm={2}>
            Link til læsning/køb
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" name="link" className="bg-light" placeholder="Link" defaultValue={formData.link || ""} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={5}>
            {/* Betalingsartikel? <select type="select" name="pay" /> */}
            Betalt adgang?
            <Form.Select
              defaultValue={formData.pay || ""}
              name="isPay"
              id=""
              //   onChange={(e) => {
              //     setIsPay(e.target.value === "true");
              //   }}
            >
              <option value="false">Gratis</option>
              <option value="true">Betalt</option>
            </Form.Select>
            {/* Betalingsartikel? <input type="checkbox" name="pay" /> */}
          </Form.Label>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupText">
          <Form.Label column sm={1}>
            Kort resume
          </Form.Label>
          <Col sm={4}>
            <Form.Control as="textarea" className="bg-light" name="resume" rows={4} defaultValue={formData.resume || ""} />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3 text-center" controlId="formBasicButton">
          <Button type="submit" variant="outline-secondary" className="mx-2 btn-dark text-warning">
            {methodToUse === "POST" ? "Opret" : "Opdater"} {formCreateType === "articles" ? "artikel" : "bog"}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
