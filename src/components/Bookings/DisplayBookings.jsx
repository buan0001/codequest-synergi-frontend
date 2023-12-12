import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function FetchComponent({ bookings, fetchBookings, fetchData }) {
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  console.log("bookings:", bookings);

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
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`Item with ID ${selectedId} deleted successfully.`);
        // Update the data after successful deletion (remove the deleted item from the list)
        // bookings.filter((item) => item.id !== selectedId);
        fetchBookings();
        fetchData();
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
    const selectedItem = bookings.find((item) => item._id === id);
    setSelectedId(id);
    setShowModal(true);
    setSelectedItem(selectedItem);
  };

  return (
    <div className="text-center mb-5 p-4">
      {bookings ? (
        <div>
          <h2 className="p-4">Kunde Bookinger</h2>
          <table className="table table-striped table-bordered responsive">
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
              {bookings.map((item) => (
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
                    <Button variant="danger" size="sm" onClick={() => handleShowModal(item._id)}>
                      Slet
                    </Button>
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
                {selectedItem.contactInfo.firstName} {selectedItem.contactInfo.lastName}, {selectedItem.appointmentInfo.service} d. {formatDateTime(selectedItem.appointmentInfo.date)}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDelete}>
            Ja
          </Button>
          <Button variant="secondary" onClick={handleNo}>
            Nej
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
