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
  const [bookOrArticle, setBookOrArticle] = useState("articles");
  const [isPay, setIsPay] = useState(false);
  // const [style, setStyle] = useState({ width: inputRef.current ? inputRef.current.value.length + 'ch' : 'auto' })

  const loggedIn = useSelector(state => state.loginState.loggedIn);
  console.log("login boolean:", loggedIn);

  const handleSort = key => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
  };
  const getSortArrow = key => {
    if (sortBy === key) {
      return sortOrder === "asc" ? "↑" : "↓";
    }
    return null;
  };

  const sortArticles = articles => {
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
        const response = await fetch(`http://localhost:3333/${bookOrArticle}`);
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
  }, [newPost, bookOrArticle]); // Dependency that decides how many times the effect runs

  async function handleSubmit(form) {
    console.log("form,", form);
    // console.log("form entries",form.entries);
    console.log("book or article?", bookOrArticle);
    const newArticleOrBook = {
      title: form.title,
      releaseYear: form.releaseYear,
      publisher: form.publisher,
      authors: authorField.map(field => {
        return { firstName: form["firstName" + field], lastName: form["lastName" + field] };
      }),
      link: form.link,
      isPay: isPay,
      resume: form.resume,
    };
    console.log("new article", newArticleOrBook);

    try {
      const response = await fetch(`http://localhost:3333/${bookOrArticle}`, {
        method: "POST",
        body: JSON.stringify(newArticleOrBook),
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

  function editClicked(e) {
    console.log("event",e.parent);
    console.log("event",e.target);
  }

  const sortAndShowButtons = (
    <div className="container">
      <div className="row">
        <div className="p-2 col-sm d-flex justify-content-center space-between">
          <select
            onChange={e => {
              setBookOrArticle(e.target.value);
            }}
          >
            <option value="articles">Artikler</option> <option value="books">Bøger</option>
          </select>
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

  const contentDisplay = (
    <div>
      {data ? (
        <div style={{ margin: "10px" }}>
          {sortArticles(data).map(item => (
            <div key={item._id} className="container my-2" style={{ border: "red 1px solid", borderRadius: "5px" }}>
              {/* <div key={item._id} className="p-2 col-sm d-flex justify-content-center space-between"> */}
              <div className="row gx-4 ">
                <h2 className="col-9">{item.title}</h2>
                {loggedIn ? (
                  <>
                    <div className="col-sm-1">
                      <button type="button" className="btn btn-danger ">
                        Slet
                      </button>
                    </div>
                    <div className="col-sm-1">
                      <button className="btn btn-primary" key={item._id} onClick={(e) => {editClicked(e)}}>Rediger</button>
                    </div>
                    <div className="col-sm-1"></div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="row">
                <p className="col">Udgivelsesår {item.releaseYear}</p>
                <p className="col">Forlag {item.publisher}</p>
              </div>
              <div>
                {" "}
                <div className="bold">Forfattere:</div>
                {item.authors.map(author => {
                  return (
                    <p key={author._id} className="col">
                      {author.firstName} {author.lastName}
                    </p>
                  );
                })}
              </div>
              <a href={item.link}>Link til {bookOrArticle == "books" ? "bogen" : "artiklen"}</a>
              {/* pay skal laves om */}
              <p>
                <b>Adgang: </b>
                {item.pay == false ? "Gratis" : "Betalt"}
              </p>
              <p className="blockquote">{item.resume}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p> // Placeholder hvis data ikke kan læses eller andet går galt
      )}
    </div>
  );

  function changeBookArticle(e) {
    // console.log("option changed",e.target.value);
    setBookOrArticle(e.target.value);
  }

  function changePay(e) {
    setIsPay(e.target.value === "true");
  }

  return (
    <div className="" style={{ backgroundColor: "rgb(237, 227, 227)" }}>
      {" "}
      {loggedIn ? (
        <div>
          {sortAndShowButtons}

          {/* Form */}
          <div className="mt-4">
            <Form
              style={{
                display: "flex",
                padding: "5px",
                gap: "10px",
                flexDirection: "column",
              }}
              onSubmit={e => {
                e.preventDefault();
                console.log("target", new FormData(e.target));
                const formEntries = Object.fromEntries(new FormData(e.target).entries());
                console.log("form entries", formEntries);
                handleSubmit(formEntries);
              }}
              // onFocus={(e) =>console.log("on focus event",e)}
              onChange={e => {
                const element = e.target;
                console.log("element", element);
                console.log("element", element.type);
                // console.log("key down e length",e.target.value.length);
                // console.log("min width ",element.style.minWidth)
                // console.log("width",element.style.width)
                // element.style.minWidth = "150px"
                if (element.type == "text") {
                  if (!element.style.minWidth) {
                    console.log("min width undefined", element.style.minWidth);
                    element.style.minWidth = "100%";
                  }
                  element.style.width = element.value.length + "ch";
                }
              }}
            >
              <select
                className="justify-content-center"
                style={{ width: "30vw" }}
                onChange={e => {
                  changeBookArticle(e);
                }}
              >
                <option value="articles">Artikel</option>
                <option value="books">Bog</option>
              </select>
              <div>
                {/* Titel, udgivelsesår, udgiver */}
                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
                  <Form.Label column sm={2}>
                    Titel
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control type="text" name="title" className="bg-light" placeholder="Titel" required />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formGroupName">
                  <Form.Label column sm={2}>
                    Udgivelsesår
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control type="number" name="releaseYear" className="bg-light" placeholder="Årstal" required />
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
                  Link til læsning/køb
                </Form.Label>
                <Col sm={3}>
                  <Form.Control type="text" name="link" className="bg-light" placeholder="Link" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3 justify-content-center">
                <Form.Label column sm={5}>
                  {/* Betalingsartikel? <select type="select" name="pay" /> */}
                  Betalt adgang?
                  <select
                    name=""
                    id=""
                    onChange={e => {
                      changePay(e);
                    }}
                  >
                    <option value="false">Gratis</option>
                    <option value="true">Betalt</option>
                  </select>
                  {/* Betalingsartikel? <input type="checkbox" name="pay" /> */}
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
            {contentDisplay}
          </div>
        </div>
      ) : (
        <div>
          {sortAndShowButtons}
          {contentDisplay}
        </div>
      )}
    </div>
  );
}
