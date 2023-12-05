import { useState, useEffect } from 'react';

export default function FetchComponent() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3333/pages/cv`
        );
        if (!response.ok) {
          throw new Error('Der opstod en fejl ved fetch');
        }
        const result = await response.json();
        console.log(result);
        const body = <div dangerouslySetInnerHTML={{ __html: result.body }}/>;
        setData(body);
      } catch (error) {
        console.error('Der opstod en fejl ved indlæsning af data:', error);
      }
    };

    fetchData();
  }, []); // Dependency that decides how many times the effect runs



  return (
    <div>
      {data ? (
        <div>
          {data}
        </div>
     ) : (
         <p>Loading...</p> // Loading text hvis data ikke kan hentes
    )}
    </div>
  );
}