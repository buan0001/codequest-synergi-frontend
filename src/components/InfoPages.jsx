import { useState, useEffect } from "react";
import tryCatch from "./TryCatch";

export default function FetchComponent({ title, update }) {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tryCatch(`pages/${title}`);
        const result = await response.json();
        const body = (
          <div style={{ display: "flex", flexFlow: "wrap", alignItems: "baseline", justifyContent: "flex-start", padding: "5%", color: "black" }} dangerouslySetInnerHTML={{ __html: result.body }} />
        );
        setData(body);
      } catch (error) {
        console.error("Der opstod en fejl ved indlæsning af data:", error);
      }
    };

    fetchData();
  }, [title, update]);

  return (
    <div style={{ margin: "2%" }}>
      {data ? (
        <div>{data}</div>
      ) : (
        <p>Loading...</p> // Loading text hvis data ikke kan hentes
      )}
    </div>
  );
}
