import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function FetchComponent() {
  const [data, setData] = useState("");
  const [authorField, setAuthorField] = useState([0]);
  const [newPost, setNewPost] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  console.log("login boolean:", loggedIn);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
  };
  const getSortArrow = (key) => {
    if (sortBy === key) {
      return sortOrder === "asc" ? "↑" : "↓";
    }
    return null;
  };

  const sortArticles = (articles) => {
    if (sortBy === "title") {
      return articles.sort((a, b) => (sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
    } else if (sortBy === "releaseYear") {
      return articles.sort((a, b) => (sortOrder === "asc" ? a.releaseYear - b.releaseYear : b.releaseYear - a.releaseYear));
    } else {
      return articles;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3333/articles");
        if (!response.ok) {
          throw new Error("Der opstod en fejl ved fetch");
        }
        const result = await response.json();
        console.log("RESULT", result);
        setData(result);
      } catch (error) {
        console.error("Der opstod en fejl ved indlæsning af data:", error);
      }
    }

    fetchData();
  }, [newPost]); // Dependency that decides how many times the effect runs

  async function handleSubmit(form) {
    const newArticle = {
      title: form.title,
      releaseYear: form.releaseYear,
      publisher: form.publisher,
      authors: authorField.map((field) => {
        return { firstName: form["firstName" + field], lastName: form["lastName" + field] };
      }),
      link: form.link,
      isPay: form.pay.checked,
      resume: form.resume,
    };
    console.log("new article", newArticle);

    try {
      const response = await fetch(`http://localhost:3333/articles`, {
        method: "POST",
        body: JSON.stringify(newArticle),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Der opstod en fejl ved fetch");
      }
      const result = await response.json();
      setNewPost(result);
      console.log(result);
      // setData(result);
    } catch (error) {
      console.error("Der opstod en fejl ved indlæsning af data:", error);
    }
  }

  const sortButtons = (
    <div className="container">
      <div className="row">
        <div className="p-2 col-sm d-flex justify-content-center space-between">
          <Button onClick={() => handleSort("title")} variant="outline-secondary" className="mx-2">
            Sorter efter titel {getSortArrow("title")}
          </Button>
          <Button onClick={() => handleSort("releaseYear")} variant="outline-secondary" className="mx-2">
            Sorter efter udgivelsesår {getSortArrow("releaseYear")}
          </Button>
        </div>
      </div>
    </div>
  );

  const articlesDisplay = (
    <div>
      {data ? (
        <div>
          {sortArticles(data).map((item) => (
            <div key={item._id}>
              <h3>{item.title}</h3>
              {/* <p>Release {item.release}</p> */}
              <p>Udgivelsesår {item.releaseYear}</p>
              <p>Forlag {item.publisher}</p>
              <div>
                {" "}
                Forfattere:
                {item.authors.map((author) => {
                  return (
                    <p key={author._id}>
                      Navn: {author.firstName} {author.lastName}
                    </p>
                  );
                })}
              </div>
              {/* <p>{item.author.lastName}</p> */}
              <a>Link {item.link}</a>
              {/* pay skal laves om */}
              <p>
                <b>Pris: </b>
                {item.pay == false ? "Gratis" : "Betalt"}
              </p>
              <p>Resume {item.resume}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p> // Placeholder hvis data ikke kan læses eller andet går galt
      )}
    </div>
  );

  return loggedIn ? (
    <div>
      {sortButtons}

      {/* Form */}
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
            handleSubmit(new FormData(e.target));
          }}
        >
          <div>
            {/* Titel, udgivelsesår, udgiver */}
            <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
              <Form.Label column sm={2}>
                Titel på bog
              </Form.Label>
              <Col sm={3}>
                <Form.Control type="text" name="title" className="bg-light" placeholder="Bogens titel" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
              <Form.Label column sm={2}>
                Udgivelsesår
              </Form.Label>
              <Col sm={3}>
                <Form.Control type="number" name="releaseyear" className="bg-light" placeholder="Årstal" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
              <Form.Label column sm={2}>
                Udgiver
              </Form.Label>
              <Col sm={3}>
                <Form.Control type="text" name="publisher" className="bg-light" placeholder="Navn på udgiver" required />
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
              Link til artiklen
            </Form.Label>
            <Col sm={3}>
              <Form.Control type="text" name="link" className="bg-light" placeholder="Link til artiklen" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 justify-content-center">
            <Form.Label column sm={5}>
              Betalingsartikel? <input type="checkbox" name="pay" />
            </Form.Label>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupText">
            <Form.Label column sm={1}>
              Kort resume
            </Form.Label>
            <Col sm={4}>
              <Form.Control as="textarea" className="bg-light" name="resume" rows={4} />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3 text-center" controlId="formBasicButton">
            <Button type="submit" variant="outline-secondary" className="mx-2">
              Opret artikel
            </Button>
          </Form.Group>
        </Form>

        {/* <div>{missingFields.length == 0 ? "" : "These fields must be filled"}</div>
      <div style={{display:"flex", gap:"10px"}}>{missingFields.length == 0 ? "" : missingFields.map(field =>{
        return <div key={field}>{field}</div>
      })}</div> */}
        {articlesDisplay}
      </div>
    </div>
  ) : (
    <div>
      {sortButtons}
      {articlesDisplay}
    </div>
  );
}
