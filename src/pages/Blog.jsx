import { useState, useEffect } from "react";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import HTTPErrorHandling from "../components/HTTPErrorHandling";
import BlogForm from "../components/Blog/BlogForm";
import BlogUserComments from "../components/Blog/BlogUserComments";

export default function Blog() {
  const [userListChanged, setUserListChanged] = useState();
  const [postChanged, setPostChanged] = useState();
  const [userComments, setUserComments] = useState();

  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userList, setUserList] = useState([]);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showUserCommentsModal, setShowUserCommentsModal] = useState(false);

  const loggedIn = useSelector((state) => state.loginState.loggedIn);

  useEffect(() => {
    async function fetchPosts() {
      const response = await HTTPErrorHandling("blog");
      if (response.ok) {
        setPosts(await response.json());
      }
    }

    fetchPosts();
  }, [postChanged]);

  useEffect(() => {
    async function fetchUsers() {
      const logInFailSafe = loggedIn || false;
      const response = await HTTPErrorHandling("users/" + logInFailSafe);
      if (response) {
        setUserList(await response.json());
      }
    }

    fetchUsers();
  }, [userListChanged, loggedIn]);

  async function deletePostClicked(e, title) {
    const blogId = e.target.id;

    // Confirm deletion with user
    const check = confirm(`Vil du virkelig slette opslaget ${title}?`);

    if (check) {
      // Send DELETE request to server
      const response = await HTTPErrorHandling("blog/" + blogId, "DELETE");

      if (response.ok) {
        // Display success message
        SuccessMessage("Opslag slettet");

        // Update state with the deleted post
        setPostChanged(await response.json());
      }
    }
  }

  async function createUser(event) {
    const form = event.target;
    const newUser = { userName: form.userName.value };

    if (loggedIn && form.admin.value === "true") {
      newUser.admin = true;
    } else {
      newUser.admin = false;
    }
    const response = await HTTPErrorHandling("users", "POST", newUser);
    if (response.ok) {
      SuccessMessage("Bruger oprettet!");
      setUserListChanged(true);
      setShowCreateUserModal(false);
    } else {
      ErrorMessage("Fejl ved oprettelse");
    }
  }

  async function getComments(postID) {
    const response = await HTTPErrorHandling("comments/" + postID);
    if (response.ok) {
      const result = await response.json();
      let existingEntry = comments?.find((post) => {
        return post._id === postID;
      });
      if (existingEntry) {
        existingEntry.comments = result;
        existingEntry.show = true;
        setComments([...comments]);
      } else {
        setComments([...comments, { _id: postID, comments: result, show: true }]);
      }
    }
  }

  async function deleteCommentClicked(comment) {
    const check = confirm(`Vil du virkelig slette kommentaren skrevet af ${comment.userID.userName}?`);
    if (check) {
      const response = await HTTPErrorHandling("comments/" + comment._id, "DELETE");
      if (response.ok) {
        SuccessMessage("Kommentar slettet");
        getComments(comment.postID);
      } else {
        ErrorMessage("Kunne ikke slette kommentar, prøv igen senere");
      }
    }
  }

  async function postComment(form, postId) {
    const newComment = {
      body: form.body.value,
      userID: form.user.value,
      postID: postId,
    };
    const response = await HTTPErrorHandling("comments", "POST", newComment);
    if (response.ok) {
      getComments(postId);
    }
  }

  function getPresentableDate(dateString) {
    const date = new Date(dateString).toLocaleDateString("da-DK", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return date;
  }

  // Displays the blog posts and comments to the user and handles the logic for creating, deleting and updating posts and comments
  // also handles the logic for displaying content depending on whether the user is logged in or not
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
                <div key={index} className="border border-secondary bg-gradient mx-3 p-3" style={{ backgroundColor: "#ffe79a" }}>
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
                                          const response = await HTTPErrorHandling("users/comments/" + comment.userID._id);
                                          if (response.ok) {
                                            const result = await response.json();
                                            result.userName = comment.userID.userName;
                                            // Make the dates reader friendly
                                            result.forEach((post) => {
                                              post.comments.forEach((comment) => (comment.createdAt = getPresentableDate(comment.createdAt)));
                                            });
                                            setShowUserCommentsModal(true);
                                            setUserComments(result);
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
                    <div>{showUserCommentsModal ? <BlogUserComments showBool={showUserCommentsModal} setBool={setShowUserCommentsModal} userInfo={userComments}></BlogUserComments> : ""}</div>
                  </div>
                </div>
              );
            })
          : "No posts found :/"}
      </div>
    </div>
  );
}
