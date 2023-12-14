import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HTTPErrorHandling from "../TryCatch";

export default function BlogForm({ updatePosts }) {
  async function handleSubmit(formEntries) {
    const newPost = {
      title: formEntries.title,
      image: formEntries.image,
      resume: formEntries.resume,
      body: formEntries.body,
      commentsAllowed: formEntries.commentsAllowed,
    };

    console.log("new post", newPost);
    const response = await HTTPErrorHandling("blog", "POST", newPost);
    console.log("response", response);
    if (response) {
      updatePosts(response);
    }
  }

  return (
    <div className="mt-4">
      <h2 className="text-center">Tilføj nyt opslag</h2>
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
              element.style.maxWidth = "40vw";
            }
            element.style.width = element.value.length + "ch";
          }
        }}
      >
        <div>
          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
            <Form.Label column sm={2}>
              Titel
            </Form.Label>
            <Col sm={3}>
              <Form.Control type="text" name="title" className="bg-light" placeholder="Titel" required />
            </Col>
          </Form.Group>
        </div>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
          <Form.Label column sm={2}>
            Link til billede
          </Form.Label>
          <Col sm={3}>
            <Form.Control type="text" name="image" className="bg-light" placeholder="URL til thumbnail" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupText">
          <Form.Label column sm={1}>
            Resume
          </Form.Label>
          <Col sm={4}>
            <Form.Control as="textarea" className="bg-light" name="resume" rows={4} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupText">
          <Form.Label column sm={1}>
            Fri tekst
          </Form.Label>
          <Col sm={4}>
            <Form.Control as="textarea" className="bg-light" name="body" rows={4} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 justify-content-center">
          <Form.Label column sm={5}>
            Tillad kommentarer?
            <Form.Select name="commentsAllowed" id="">
              <option value="true">Alle kan kommentere</option>
              <option value="false">Ingen kommentarer tilladt</option>
            </Form.Select>
          </Form.Label>
        </Form.Group>

        <Form.Group className="mb-3 text-center" controlId="formBasicButton">
          <Button type="submit" variant="outline-secondary" className="mx-2 btn-dark text-warning">
            Opret
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
