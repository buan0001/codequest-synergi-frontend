import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import BookArticleForm from "./BooksArticlesForm";
// showModal showBorA setChangedPost setShowModal
export default function UpdateModal({showModal, showBorA, setChangedPost, setShowModal,formData}){
//   const [showModal, setShowModal] = useState(false);
    return (
      <div>
        <Modal show={showModal} dialogClassName="" size="xl">
          <Modal.Dialog size="xl" className="text-primary">
            <Modal.Header
              closeButton
              onClick={() => {
                setShowModal(false);
              }}
            >
              <Modal.Title>Rediger {showBorA == "books" ? "bog" : "artikel"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BookArticleForm formData={formData} newSubmit={setChangedPost} methodToUse={"PATCH"} bookOrArticle={showBorA}></BookArticleForm>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Luk
              </Button>
              {/* <Button variant="primary">Gem ændringer</Button> */}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    );
}