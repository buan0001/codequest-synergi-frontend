import { useState, useEffect } from "react";

export default function FetchComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/booksandarticles");
        if (!response.ok) {
          throw new Error("Der opstod en fejl ved fetch");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Der opstod en fejl ved indlæsning af data:", error);
      }
    };

    fetchData();
  }, []); // Dependency that decides how many times the effect runs

  return (
    <div>
      {data ? (
        <div>
          <h3>{data.pageTitle}</h3>
          {data.pageBody.map((item) => (
            <div key={item._id}>
              <h5>{item.title}</h5>
              <p>{item.description}</p>
                <p>{item.author}</p>
                <p>{item.published}</p>
                <p>{item.publisher}</p>
                <p>{item.pages}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p> // Loading text hvis data ikke kan hentes
      )}
    </div>
  );
}
