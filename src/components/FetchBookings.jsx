import { useState, useEffect } from "react";

export default function FetchComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/booking");
        if (!response.ok) {
          throw new Error("Der opstod en fejl ved fetch");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Der opstod en fejl ved indlæsning af data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDateTime = (dateTime) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateTime).toLocaleString("da-DK", options);
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
                <th>Starttid</th>
                <th>Sluttid</th>
                <th>Besked</th>
                <th>Service</th>
                <th>Email</th>
                <th>Telefon nr</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.contactInfo.firstName} {item.contactInfo.lastName}
                  </td>
                  <td>{formatDateTime(item.appointmentInfo.firstDay)}</td>
                  <td>{formatDateTime(item.appointmentInfo.lastDay)}</td>
                  <td>{item.appointmentInfo.message}</td>
                  <td>{item.appointmentInfo.service}</td>
                  <td>{item.contactInfo.email}</td>
                  <td>{item.contactInfo.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
