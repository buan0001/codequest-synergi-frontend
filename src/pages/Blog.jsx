import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Modal } from "react-bootstrap";
import tryCatch from "../components/TryCatch";
import BlogForm from "../components/Blog/BlogForm";

export default function Blog() {
  const [posts, setPosts] = useState("");
  const [postChanged, setPostChanged] = useState();
  const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false)

  const loggedIn = useSelector((state) => state.loginState.loggedIn);

  useEffect(() => {
    async function fetchPosts() {
      const response = await tryCatch("blog");
      console.log("GETTING POSTS", response);
      if (response) {
        setPosts(response);
      }
    }

    fetchPosts();
  }, [postChanged]); // empty for now

  useEffect(() => {
    async function fetchUsers() {
      const response = await tryCatch("users");
      console.log("GETTING USERS", response);
      if (response) {
        setUserList(response);
      }
    }

    fetchUsers();
  }, []); // empty for now

  async function deletePostClicked(e, title) {
    const blogId = e.target.id;
    console.log("id to delete", blogId);
    const check = confirm(`Do you wish to delete ${title}?`);
    if (check) {
      const response = await tryCatch("blog/" + blogId, { method: "DELETE" });
      console.log("delete response", response);
      if (response) {
        setPostChanged(response);
      }
    }
  }

  async function createUser(event) {
    const form = event.target
    const newUser = {userName: form.userName.value}
    const response = await tryCatch("users", {method:"POST", })
  }

  async function getComments(postID) {}

  async function postComment(form, postID) {
    // const form =
    console.log("posting comment", form);
    console.log("post id", postID);
    const newComment = {
      body: form.body.value,
      userID: form.user.value,
      postID: postID,
    };
    console.log("new comment", newComment);
  }

  return (
    <div>
      {loggedIn ? (
        <div>
          <Button
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            Skjul/vis oprettelsesformular
          </Button>
          {showForm ? <BlogForm></BlogForm> : ""}
        </div>
      ) : (
        <div>Not logged in</div>
      )}
      <div className="d-flex p-2 bd-highlight mx-auto" style={{ border: "5px solid black" }}>
        {posts.length > 0
          ? posts.map((entry, index) => {
              return (
                <div key={index} className="border border-secondary bg-warning mx-auto">
                  <div>Titel: {entry.title}</div>
                  <div>
                    Billede: <img src={entry.image} width={200} height={200}></img>
                  </div>
                  <div>Resume: {entry.resume}</div>
                  <div>Body: {entry.body}</div>
                  {loggedIn ? (
                    <Button
                      className="btn-danger"
                      id={entry._id}
                      onClick={(e) => {
                        deletePostClicked(e, entry.title);
                      }}
                    >
                      Slet opslag
                    </Button>
                  ) : (
                    ""
                  )}

                  <div>
                    {showComments.find((obj) => {
                      return obj.id === entry._id;
                    }) ? (
                      <div>
                        <Button
                          onClick={() => {
                            setShowComments(
                              [...showComments].filter((obj) => {
                                obj.id === entry._id;
                              })
                            );
                          }}
                        >
                          Skjul kommentarer
                        </Button>
                        {}
                        <br></br>
                        <br></br>
                        <br></br>
                        <div>
                          <Modal show={showModal} dialogClassName="" size="xl">
                            <Modal.Dialog size="xl" className="text-dark">
                              <Modal.Header
                                closeButton
                                onClick={() => {
                                  setShowModal(false);
                                }}
                              >
                                <Modal.Title>Tilføj ny bruger</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form onSubmit={(e) => {e.preventDefault(); createUser(e)}}>
                                  <Form.Group>
                                    <Form.Label>Navn</Form.Label>
                                    <Form.Control type="text" name="userName"></Form.Control>
                                  </Form.Group>
                                </Form>
                              </Modal.Body>

                              <Modal.Footer>
                                  <Button variant="primary">Opret bruger</Button>
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    setShowModal(false);
                                  }}
                                >
                                  Luk
                                </Button>
                              </Modal.Footer>
                            </Modal.Dialog>
                          </Modal>
                        </div>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            postComment(e.target, entry._id);
                          }}
                        >
                          <div>
                            Er du ikke på listen?{" "}
                            <Button
                              onClick={() => {
                                setShowModal(!showModal);
                              }}
                            >
                              Opret ny bruger her
                            </Button>
                          </div>
                          <Form.Group>
                            <Form.Label>Hvilken bruger skriver?</Form.Label>
                            <Form.Select name="user">
                              {userList instanceof Array ? (
                                userList.map((entry) => {
                                  return <option key={entry._id}>{entry.userName}</option>;
                                })
                              ) : (
                                <option>No users found</option>
                              )}
                            </Form.Select>
                          </Form.Group>

                          <Form.Group>
                            <Form.Label>Ny kommentar:</Form.Label>
                            <Form.Control as="textarea" rows={3} name="body" />
                          </Form.Group>
                          <Button type="submit">Tilføj kommentar</Button>
                        </Form>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setShowComments([...showComments, { id: entry._id }]);
                          getComments(entry._id);
                        }}
                      >
                        Vis kommentarer
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          : "No posts found :/"}
      </div>
    </div>
  );
}
