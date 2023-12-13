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
import BlogUserComments from "../components/Blog/BlogUserComments";

export default function Blog() {
  const [userListChanged, setUserListChanged] = useState();
  const [postChanged, setPostChanged] = useState();
  const [userComments, setUserComments] = useState();
  // const [commentsChanged, setCommentsChanged] = useState();

  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  //   const [showComments, setShowComments] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUserCommentsModal, setShowUserCommentsModal] = useState(false);

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
    const check = confirm(`Vil du virkelig slette opslaget ${title}?`);
    if (check) {
      const response = await tryCatch("blog/" + blogId, { method: "DELETE" });
      console.log("delete response", response);
      if (response) {
        SuccessMessage("Opslag slettet")
        setPostChanged(response);
      }
      else {ErrorMessage("Kunne ikke slette, prøv igen senere")}
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
      SuccessMessage("Bruger oprettet!")
      setUserListChanged(response);
      setShowCreateUserModal(false);
    }
    else {ErrorMessage("Fejl ved oprettelse")}
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
    }
  }

  async function deleteCommentClicked(comment) {
    const check = confirm(`Vil du virkelig slette kommentaren skrevet af ${comment.userID.userName}?`);
    if (check) {
      const response = await tryCatch("comments/" + comment._id, { method: "DELETE" });
      console.log("delete response", response);
      if (response) {
        SuccessMessage("Kommentar slettet")
        getComments(comment.postID);
      }
      else {ErrorMessage("Kunne ikke slette kommentar, prøv igen senere")}
    }
  }

  async function postComment(form, postId) {
    const newComment = {
      body: form.body.value,
      userID: form.user.value,
      postID: postId,
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
      getComments(postId);
    }
  }

  function getPresentableDate(dateString) {
    // console.log("date string",dateString);
    const date = new Date(dateString).toLocaleDateString("da-DK", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return date;
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
                <div key={index} className="border border-secondary bg-warning mx-auto p-3">
                  <div className="p-3 text-center">Titel: {entry.title}</div>
                  <div className="d-flex p-3 justify-content-center">
                    <img src={entry.image} width={200} height={200}></img>
                  </div>
                  <div className="p-3">Resume: {entry.resume}</div>
                  <div className="p-3">Body: {entry.body}</div>
                  {loggedIn ? (
                    <Button
                      className="btn-danger p-2 mx-auto d-block"
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

                  <div className="p-3">
                    {comments?.find((obj) => {
                      return obj._id === entry._id && obj.show === true;
                    }) ? (
                      <div className="p-3 ">
                        <Button
                          className="btn-primary p-2 mx-auto d-block"
                          onClick={() => {
                            const newArray = [...comments];

                            newArray.find((obj) => {
                              return obj._id === entry._id;
                            }).show = false;

                            setComments(newArray);
                          }}
                        >
                          Skjul kommentarer
                        </Button>

                        <div>
                          <Modal show={showCreateUserModal} dialogClassName="" size="xl">
                            <Modal.Dialog size="xl" className="text-dark">
                              <Modal.Header
                                closeButton
                                onClick={() => {
                                  setShowCreateUserModal(false);
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
                                  <Button type="submit" className="btn-success">
                                    Opret bruger
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    onClick={() => {
                                      setShowCreateUserModal(false);
                                    }}
                                  >
                                    Luk
                                  </Button>
                                </Modal.Footer>
                              </Form>
                            </Modal.Dialog>
                          </Modal>
                        </div>
                        {entry.commentsAllowed ? "" : ""}
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            postComment(e.target, entry._id);
                          }}
                        >
                          <div className="mb-4 mt-5">
                            Er du ikke på listen?{" "}
                            <Button
                              className="btn-success"
                              onClick={() => {
                                setShowCreateUserModal(!showCreateUserModal);
                              }}
                            >
                              Opret ny bruger her
                            </Button>
                          </div>
                          <Form.Group className="mb-4">
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
                            <Form.Control className="mb-4" as="textarea" rows={3} name="body" />
                          </Form.Group>
                          <Button className="btn-primary p-2 mx-auto d-block my-2" type="submit">
                            Tilføj kommentar
                          </Button>
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
                                    <div key={index} className="border border-dark p-3 my-3">
                                      <div>
                                        {comment.body} - {getPresentableDate(comment.createdAt)}
                                      </div>

                                      <div
                                        className="text-primary font-weight-bold"
                                        onMouseOver={(e) => (e.target.style.cursor = "pointer")}
                                        onClick={async () => {
                                          const response = await tryCatch("users/comments/" + comment.userID._id);
                                          if (response) {
                                            response.userName = comment.userID.userName;
                                            // Make the dates reader friendly
                                            response.forEach((post) => {
                                              post.comments.forEach((comment) => (comment.createdAt = getPresentableDate(comment.createdAt)));
                                            });
                                            console.log("getting comments from one user", response);
                                            setShowUserCommentsModal(true);
                                            setUserComments(response);
                                          }
                                        }}
                                      >
                                        - {comment.userID.userName}
                                      </div>
                                      {loggedIn ? (
                                        <Button
                                          className="btn-danger p-2 mx-auto d-block my-2"
                                          onClick={() => {
                                            deleteCommentClicked(comment);
                                          }}
                                        >
                                          Slet kommentar
                                        </Button>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  );
                                })
                            : "Ingen kommentarer endnu"}
                        </div>
                      </div>
                    ) : (
                      <div>
                        {" "}
                        <Button
                          disabled={entry.commentsAllowed ? false : true}
                          onClick={() => {
                            getComments(entry._id);
                          }}
                        >
                          {entry.commentsAllowed ? "Vis kommentarer" : "Kommentarer slået fra"}
                        </Button>
                      </div>
                    )}
                    <div>
                      {/* {showUserCommentsModal ? <BlogUserComments/> : (() => {console.log("not showing user comments");return "hej";})} */}
                      {showUserCommentsModal ? <BlogUserComments showBool={showUserCommentsModal} setBool={setShowUserCommentsModal} userInfo={userComments}></BlogUserComments> : ""}
                    </div>
                  </div>
                </div>
              );
            })
          : "No posts found :/"}
      </div>
    </div>
  );
}
