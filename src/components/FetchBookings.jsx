import { useState, useEffect } from "react";
import tryCatch from "./TryCatch";
import { Button, Modal } from "react-bootstrap";

export default function FetchComponent() {
  const [data, setData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await tryCatch("booking");
      if (response) {
        const sortedData = response.sort((a, b) => new Date(a.appointmentInfo.date) - new Date(b.appointmentInfo.date));
        setData(sortedData);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTime) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateTime).toLocaleString("da-DK", options);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3333/booking/${selectedId}`, {
        method: "DELETE",
        // Add headers if needed, such as authorization headers
      });

      if (response.ok) {
        console.log(`Item with ID ${selectedId} deleted successfully.`);
        // Update the data after successful deletion (remove the deleted item from the list)
        setData(data.filter((item) => item.id !== selectedId));
        // fetchData();
      } else {
        console.error("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error occurred while deleting:", error);
    } finally {
      setSelectedId(null);
      setShowModal(false);
    }
  };

  const handleNo = () => {
    setShowModal(false);
  };

  const handleShowModal = (id) => {
    const selectedItem = data.find((item) => item._id === id);
    setSelectedId(id);
    setShowModal(true);
    setSelectedItem(selectedItem);
  };

  return (
    <div>
      {data ? (
        <div>
          <h2>Kunde Bookinger</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Navn</th>
                <th>Dato</th>
                <th>Besked</th>
                <th>Service</th>
                <th>Email</th>
                <th>Telefon nr</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>
                    {item.contactInfo.firstName} {item.contactInfo.lastName}{" "}
                  </td>
                  <td>{formatDateTime(item.appointmentInfo.date)}</td>
                  <td>{item.appointmentInfo.message}</td>
                  <td>{item.appointmentInfo.service}</td>
                  <td>{item.contactInfo.email}</td>
                  <td>{item.contactInfo.phoneNumber}</td>
                  <td>
                    <Button onClick={() => handleShowModal(item._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Du er ved at slette en booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              <p>Er du sikker på du vil slette denne booking?</p>
              <p>
                {selectedItem.contactInfo.firstName} {selectedItem.contactInfo.lastName}, {selectedItem.appointmentInfo.service}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleNo}>
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
