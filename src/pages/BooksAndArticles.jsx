import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import HTTPErrorHandling from "../components/HTTPErrorHandling";
import BooksArticlesForm from "../components/BooksArticles/BooksArticlesForm";
import UpdateModal from "../components/BooksArticles/UpdateModal";

export default function FetchComponent() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState("");
  const [changedPost, setChangedPost] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showBorA, setShowBorA] = useState("articles");
  const [formData, setFormData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const loggedIn = useSelector((state) => state.loginState.loggedIn);

  // handles sorting order for books and articles
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

  const sortBooksAndArticles = (item) => {
    if (sortBy === "title") {
      return item.sort((a, b) => (sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
    } else if (sortBy === "releaseYear") {
      return item.sort((a, b) => (sortOrder === "asc" ? a.releaseYear - b.releaseYear : b.releaseYear - a.releaseYear));
    } else {
      return item;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await HTTPErrorHandling(showBorA);
      if (response.ok) {
        setData(await response.json());
      }
    }

    fetchData();
  }, [changedPost, showBorA]); // Dependency that decides how many times the effect runs

  async function deleteClicked(e) {
    const id = e.target.id;
    const confirmCheck = confirm("Vil du virkelig slette?");
    if (confirmCheck) {
      const res = await HTTPErrorHandling(showBorA + "/" + id, "DELETE");
      if (res.ok) {
        setChangedPost(await res.json());
      }
    }
  }

  async function editClicked(e) {
    const id = e.target.id;
    const res = await HTTPErrorHandling(showBorA + "/" + id);
    if (res.ok) {
      const result = res.json();
      setFormData(result);
      setShowModal(!showModal);
      scrollTo({ top: 100, behavior: "smooth" });
    }
  }

  const sortAndShowButtons = (
    <div className="container">
      <div className="row">
        <div className="p-2 col-sm d-flex justify-content-center space-between">
          <Form.Select
            onChange={(e) => {
              setShowBorA(e.target.value);
            }}
            size="sm"
            style={{ width: "10vw" }}
            className="p-3"
          >
            <option value="articles">Artikler</option>
            <option value="books">Bøger</option>
          </Form.Select>
          <Button onClick={() => handleSort("title")} variant="outline-secondary" className="mx-2">
            Sorter efter titel {getSortArrow("title")}
          </Button>
          <Button onClick={() => handleSort("releaseYear")} variant="outline-secondary" className="mx-2">
            Sorter efter udgivelsesår {getSortArrow("releaseYear")}
          </Button>
          <Form.Control type="text" placeholder="Søg på bøger/artikler" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
    </div>
  );

  const contentDisplay = (
    <div>
      {data ? (
        <div style={{ margin: "10px" }}>
          {sortBooksAndArticles(data)
            .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item) => (
              <div key={item._id} className="container my-2" style={{ border: "red 1px solid", borderRadius: "5px" }}>
                <div className="row gx-4 ">
                  <h2 className="col-9">{item.title}</h2>
                  {loggedIn ? (
                    <>
                      <div className="col-sm-1">
                        <button
                          type="button"
                          className="btn btn-danger"
                          id={item._id}
                          onClick={(e) => {
                            deleteClicked(e);
                          }}
                        >
                          Slet
                        </button>
                      </div>
                      <div className="col-sm-1">
                        <button
                          className="btn btn-primary"
                          id={item._id}
                          onClick={(e) => {
                            editClicked(e);
                          }}
                        >
                          Rediger
                        </button>
                      </div>
                      <div className="col-sm-1"></div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row">
                  <p className="col">
                    {" "}
                    <b>Udgivelsesår: </b>
                    {item.releaseYear}
                  </p>
                  <p className="col">
                    <b>Forlag: </b>
                    {item.publisher}
                  </p>
                </div>
                <div>
                  {" "}
                  <div className="col">
                    <b>Forfattere: </b>
                  </div>
                  {item.authors.map((author) => {
                    return (
                      <p key={author._id} className="col">
                        {author.firstName} {author.lastName}
                      </p>
                    );
                  })}
                </div>
                <div>{item.link ? <a href={item.link}>Link til {showBorA == "books" ? "bogen" : "artiklen"}</a> : ""}</div>
                <p>
                  <b>Adgang: </b>
                  {item.pay == false ? "Gratis" : "Betalt"}
                </p>
                <p className="blockquote">{item.resume}</p>
              </div>
            ))}
        </div>
      ) : (
        <p>Loading...</p> // Placeholder if the data cannot be read or something else goes wrong
      )}
    </div>
  );

  // Display content, depending on whether user is logged in or not
  return (
    <div className="" style={{ backgroundColor: "rgb(237, 227, 227)" }}>
      {" "}
      {loggedIn ? (
        <div>
          {showModal ? (
            <UpdateModal showModal={showModal} showBorA={showBorA} setChangedPost={setChangedPost} setShowModal={setShowModal} formData={formData}></UpdateModal>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Button
                style={{ height: "80px", width: "30%", margin: "auto" }}
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                Vis/skjul oprettelsesformular
              </Button>
              {showForm ? <BookArticleForm formData={""} newSubmit={setChangedPost}></BookArticleForm> : ""}
            </div>
          )}

          <div>
            {sortAndShowButtons}

            <div className="mt-4">{contentDisplay}</div>
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
