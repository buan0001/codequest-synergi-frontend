import { useState, useEffect } from "react";

export default function FetchComponent(prop) {
  console.log(prop);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3333/pages/${prop.title}`);
        if (!response.ok) {
          throw new Error("Der opstod en fejl ved fetch");
        }
        const result = await response.json();
        console.log(result);
        const body = (
          <div style={{ display: "flex", flexFlow: "wrap", alignItems: "baseline", justifyContent: "flex-start", padding: "5%", color: "black" }} dangerouslySetInnerHTML={{ __html: result.body }} />
        );
        setData(body);
      } catch (error) {
        console.error("Der opstod en fejl ved indlæsning af data:", error);
      }
    };

    fetchData();
  }, [prop]); // Dependency that decides how many times the effect runs

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
