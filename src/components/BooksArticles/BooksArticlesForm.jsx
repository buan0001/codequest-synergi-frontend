import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HTTPErrorHandling from "../TryCatch";

export default function BooksArticlesForm({ formData, newSubmit, methodToUse = "POST", bookOrArticle }) {
  const [formCreateType, setFormCreateType] = useState("articles");
  const [authorField, setAuthorField] = useState(
    methodToUse === "POST"
      ? [{ placement: 0 }]
      : formData.authors.map((author, index) => {
          return { firstName: author.firstName, lastName: author.lastName, placement: index };
        })
  );

  async function handleSubmit(form) {
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

    let path = form.bookOrArticle;

    if (methodToUse === "PATCH") {
      newArticleOrBook._id = formData._id;
    }

    const response = await HTTPErrorHandling(path, methodToUse, newArticleOrBook);
    if (response) {
      newSubmit(response);
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
          const formEntries = Object.fromEntries(new FormData(e.target).entries());
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
                          const newField = authorField.filter((entry) => {
                            return entry.placement !== id;
                          });
                          newField.forEach((entry, index) => {
                            entry.placement = index;
                          });

                          if (newField.length !== 0) {
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
            Betalt adgang?
            <Form.Select defaultValue={formData.pay || ""} name="isPay" id="">
              <option value="false">Gratis</option>
              <option value="true">Betalt</option>
            </Form.Select>
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
