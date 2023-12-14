import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import BooksArticlesForm from "./BooksArticlesForm";

export default function UpdateModal({ showModal, showBorA, setChangedPost, setShowModal, formData }) {
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
            {/* Display the appropriate title based on the value */}
            <Modal.Title>Rediger {showBorA == "books" ? "bog" : "artikel"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Render the BooksArticlesForm component with the provided props */}
            <BooksArticlesForm formData={formData} newSubmit={setChangedPost} methodToUse={"PATCH"} bookOrArticle={showBorA}></BooksArticlesForm>
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
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
