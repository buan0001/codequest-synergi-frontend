import { useState, useEffect } from 'react';

function FetchComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3333/frontpage"
        );
        if (!response.ok) {
          throw new Error('Der opstod en fejl ved fetch');
        }
        const result = await response.json();
        console.log(result);
        setData(result[0].pagebody);
      } catch (error) {
        console.error('Der opstod en fejl ved indlæsning af data:', error);
      }
    };

    fetchData();
  }, []); // Dependency that decides how many times the effect runs

  return (
    <div>
      {Array.isArray(data) && data.length > 0 ? (
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p> // Loading text hvis data ikke kan hentes
      )}
    </div>
  );
}

export default FetchComponent;
