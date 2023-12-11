import { useState, useEffect } from "react";
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
      const response = await tryCatch("users");
      console.log("GETTING USERS", response);
      if (response) {
        setUserList(response);
      }
    }

    fetchUsers();
  }, [userListChanged]);

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
          console.log("existing entry",existingEntry);
        existingEntry.comments = response;
        existingEntry.show = true
        console.log("existing entry",existingEntry);
        console.log("COMMENTS check",comments);
        setComments([...comments]);
      } else {
        setComments([...comments, { _id: postID, comments: response, show: true }]);
      }
      //   const updatedEntry = existingEntry ? (existingEntry.comments = response) : { _id: postID, comments: response, show: true };
    //   console.log("updated entry", updatedEntry);
    }
  }

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
                      console.log("comments", comments);
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
                          }).comments
                            ? comments
                                .find((obj) => {
                                  return obj._id === entry._id;
                                })
                                .comments.map((comment, index) => {
                                  return <div key={index}>{comment.body}</div>;
                                })
                            : "No comments found"}
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
