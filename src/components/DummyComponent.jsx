import { useState, useEffect } from 'react';

function FetchComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users?page=2");
        if (!response.ok) {
          throw new Error('Der opstod en fejl ved fetch');
        }
        const result = await response.json();
        console.log(result);
        setData(result.data);
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
              <h3>{item.first_name}</h3>
              <p>{item.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FetchComponent;
