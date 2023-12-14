import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function BlogUserComments({ showBool, setBool, userInfo }) {
  function someFunction() {
    return false;
  }

  return (
    <div>
      {userInfo ? (
        <Modal show={showBool} size="xl">
          <Modal.Dialog size="xl" className="text-dark">
            <Modal.Header
              closeButton
              onClick={() => {
                setBool(false);
              }}
            >
              <Modal.Title>Kommentarer af {userInfo.userName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {userInfo.map((post) => {
                return (
                  <div key={post._id}>
                    <Container fluid>
                      <Row>
                        <Col xs={4}>
                          <h2>{post.title}</h2>
                        </Col>
                        <Col>
                          <img src={post.image} height={"150px"} width={"150px"} />
                        </Col>
                      </Row>
                      {post.comments.map((comment, index) => {
                        return (
                          <div key={index}>
                            {" "}
                            <Row className="overflow-auto my-2 py-1">
                              <Col xs={4} md="auto">
                                {comment.body}
                              </Col>
                              <Col>- {comment.createdAt}</Col>
                            </Row>
                          </div>
                        );
                      })}
                    </Container>
                  </div>
                );
              })}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setBool(false);
                }}
              >
                Luk
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      ) : (
        <Button
          onClick={() => {
            someFunction();
          }}
        >
          KLIK MIG @@@@@@@@@@@
        </Button>
      )}
    </div>
  );
}
