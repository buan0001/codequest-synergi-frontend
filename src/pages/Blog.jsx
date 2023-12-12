import { useState, useEffect } from "react";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Modal } from "react-bootstrap";
import tryCatch from "../components/TryCatch";
import BlogForm from "../components/Blog/BlogForm";

export default function Blog() {
  const [userListChanged, setUserListChanged] = useState();
  const [postChanged, setPostChanged] = useState();
  // const [commentsChanged, setCommentsChanged] = useState();

  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  //   const [showComments, setShowComments] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
  }, [postChanged]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await tryCatch("users/" + loggedIn);
      console.log("GETTING USERS", response);
      if (response) {
        setUserList(response);
      }
    }

    fetchUsers();
  }, [userListChanged, loggedIn]);

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
    const form = event.target;
    const newUser = { userName: form.userName.value };
    // console.log("form admin",form.admin.value);
    if (loggedIn && form.admin.value === "true") {
      newUser.admin = true;
    } else {
      newUser.admin = false;
    }
    console.log("creating user", newUser);
    const response = await tryCatch("users", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      setUserListChanged(response);
      setShowModal(false);
    }
  }

  async function getComments(postID) {
    const response = await tryCatch("comments/" + postID);
    console.log("GETTING COMMENTS", response);
    if (response) {
      let existingEntry = comments?.find((post) => {
        return post._id === postID;
      });
      if (existingEntry) {
        existingEntry.comments = response;
        existingEntry.show = true;
        setComments([...comments]);
      } else {
        setComments([...comments, { _id: postID, comments: response, show: true }]);
      }
      //   const updatedEntry = existingEntry ? (existingEntry.comments = response) : { _id: postID, comments: response, show: true };
      //   console.log("updated entry", updatedEntry);
    }
  }

  async function deleteCommentClicked(comment) {
    const check = confirm(`Vil du virkelig slette kommentaren skrevet af ${comment.userID.userName}?`);
    if (check) {
      const response = await tryCatch("comments/" + comment._id, { method: "DELETE" });
      console.log("delete response", response);
      if (response) {
        getComments(comment.postID);
      }
    }
  }

  async function postComment(form, postID) {
    const newComment = {
      body: form.body.value,
      userID: form.user.value,
      postID: postID,
    };
    console.log("new comment", newComment);
    const response = await tryCatch("comments", {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      getComments(postID);
    }
  }

  function getPresentableDate(dateString) {
    console.log("date string",dateString);
    const date = new Date(dateString)
    console.log(date.toLocaleDateString("da-DK"));
    console.log(date.toLocaleString("da-DK"));
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
            {showForm ? "Skjul" : "Vis"} oprettelsesformular
          </Button>
          {showForm ? <BlogForm updatePosts={setPostChanged}></BlogForm> : ""}
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
                    {comments?.find((obj) => {
                      return obj._id === entry._id && obj.show === true;
                    }) ? (
                      <div>
                        <Button
                          onClick={() => {
                            const newArray = [...comments];
                            console.log("new array", newArray);
                            newArray.find((obj) => {
                              console.log("obj id", obj._id);
                              console.log("entry id", entry._id);
                              return obj._id === entry._id;
                            }).show = false;
                            console.log("new array", newArray);
                            setComments(newArray);
                          }}
                        >
                          Skjul kommentarer
                        </Button>

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
                              <Form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  createUser(e);
                                }}
                              >
                                <Modal.Body>
                                  <Form.Group>
                                    <Form.Label>Navn</Form.Label>
                                    <Form.Control type="text" name="userName"></Form.Control>
                                  </Form.Group>
                                  {loggedIn ? (
                                    <Form.Group>
                                      <Form.Label>
                                        Ny admin bruger?{" "}
                                        <Form.Select name="admin">
                                          <option value={false}>Nej</option>
                                          <option value={true}>Ja</option>
                                        </Form.Select>
                                      </Form.Label>
                                    </Form.Group>
                                  ) : (
                                    ""
                                  )}
                                </Modal.Body>

                                <Modal.Footer>
                                  <Button type="submit" variant="primary">
                                    Opret bruger
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    onClick={() => {
                                      setShowModal(false);
                                    }}
                                  >
                                    Luk
                                  </Button>
                                </Modal.Footer>
                              </Form>
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
                                  return (
                                    <option key={entry._id} value={entry._id}>
                                      {entry.userName}
                                    </option>
                                  );
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
                        <div>
                          {comments.find((obj) => {
                            return obj._id === entry._id;
                          }).comments.length > 0
                            ? comments
                                .find((obj) => {
                                  return obj._id === entry._id;
                                })
                                .comments.map((comment, index) => {
                                  return (
                                    <div key={index}>
                                      <div>{comment.body} - {getPresentableDate(comment.createdAt)}</div>
                                      {loggedIn ? (
                                        <Button
                                          className="btn-danger"
                                          onClick={() => {
                                            deleteCommentClicked(comment);
                                            console.log("clicked to delete comment with id", comment._id);
                                          }}
                                        >
                                          Slet kommentar
                                        </Button>
                                      ) : (
                                        ""
                                      )}
                                      <div
                                        className="text-primary font-weight-bold"
                                        onMouseOver={(e) => (e.target.style.cursor = "pointer")}
                                        onClick={() => {
                                          console.log("clicked on user with id", comment.userID._id);
                                        }}
                                      >
                                        - {comment.userID.userName}
                                      </div>
                                    </div>
                                  );
                                })
                            : "Ingen kommentarer endnu"}
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
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
