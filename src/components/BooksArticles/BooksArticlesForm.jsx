import { useState } from "react";
import Button from "react-bootstrap/Button";
// import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import tryCatch from "../components/TryCatch";
import tryCatch from "../TryCatch";

export default function BookArticleForm(props) {
  const [changedPost, setChangedPost] = useState("");
  const [showBorA, setShowBorA] = useState("articles");
  const [isPay, setIsPay] = useState(false);
  const [formCreateType, setFormCreateType] = useState("articles");
  const [authorField, setAuthorField] = useState([0]);
  const [formData, setFormData] = useState("");

  async function handleSubmit(form, methodToUse = "POST") {
    console.log("PROPS", props);
    console.log("form,", form);
    console.log("book or article?", formCreateType);
    const newArticleOrBook = {
      title: form.title,
      releaseYear: form.releaseYear,
      publisher: form.publisher,
      authors: authorField.map((field) => {
        return { firstName: form["firstName" + field], lastName: form["lastName" + field] };
      }),
      link: form.link,
      isPay: isPay,
      resume: form.resume,
    };
    console.log("new article", newArticleOrBook);
    let path = methodToUse === "POST" ? formCreateType : `${formCreateType}/${props._id}`;
    const response = await tryCatch(path, {
      method: methodToUse,
      body: JSON.stringify(newArticleOrBook),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    if (response) {
      setChangedPost(response);
    }
  }

  return (
    <div className="mt-4">
      <Form
        style={{
          display: "flex",
          padding: "5px",
          gap: "10px",
          flexDirection: "column",
        }}
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
              defaultValue={showBorA}
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
              <Form.Control type="text" name="title" className="bg-light" placeholder="Titel" required defaultValue={props.publisher} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
            <Form.Label column sm={2}>
              Udgivelsesår
            </Form.Label>
            <Col sm={3}>
              <Form.Control type="number" name="releaseYear" className="bg-light" placeholder="Årstal" required defaultValue={props.publisher} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
            <Form.Label column sm={2}>
              Udgiver
            </Form.Label>
            <Col sm={3}>
              <Form.Control type="text" name="publisher" className="bg-light" placeholder="Navn på udgiver" required defaultValue={props.publisher} />
            </Col>
          </Form.Group>
        </div>

        <div>
          {authorField.map((field, index) => {
            console.log("author field", authorField);
            return (
              <div key={field}>
                <div>
                  <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
                    <Form.Label column sm={2}>
                      Forfatter {index + 1}:
                    </Form.Label>
                    <Col sm={3}>
                      <Form.Control type="text" name={"firstName" + index} className="bg-light" placeholder="Fornavn" required />
                    </Col>
                    <Col sm={3}>
                      <Form.Control type="text" name={"lastName" + index} className="bg-light" placeholder="Efternavn" required />
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
                  setAuthorField([...authorField, authorField.length]);
                }}
                variant="outline-secondary"
                className="mx-2"
              >
                Tilføj ny forfatter
              </Button>
              <Button
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
            {/* Betalingsartikel? <select type="select" name="pay" /> */}
            Betalt adgang?
            <Form.Select
              defaultValue={formData.pay || ""}
              name=""
              id=""
              onChange={(e) => {
                setIsPay(e.target.value === "true");
              }}
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
          <Button type="submit" variant="outline-secondary" className="mx-2">
            Opret {formCreateType === "articles" ? "artikel" : "bog"}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
