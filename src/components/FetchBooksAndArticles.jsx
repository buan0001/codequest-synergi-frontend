import { useState, useEffect } from "react";

export default function FetchComponent() {
  const [data, setData] = useState(null);
  const [authorField, setAuthorField] = useState([1])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/pages/titles");
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

  // title: { type: String, required: true, unique: true },
  // release: { type: Date, required: true },
  // releaseYear: { type: Number, required: true },
  // publisher: { type: String, required: true },
  // authors: {
  //   type: [
  //     {
  //       firstname: { type: String, required: true },
  //       lastname: { type: String, required: true }
  //     }
  //   ],
  //   required: true
  // },
  // link: { type: String },
  // pay: { type: Boolean, default: false },
  // resume: { type: String }
  return (
    <div>
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" name="title"/>
        <label htmlFor="">Udgivelsesdato
        <input type="date" name="release" />
        </label>
        <label>Udgiver
        <input type="text" name="publisher" />
        </label>
        <input type="text" name=""/>
        {authorField.map((field, index) => {return <div><label>Author {index+1}: <label>Fornavn <input key={field} type="text" name={"firstName"+index}/></label>
        <label htmlFor={"lastName"+index}>Efternavn <input key={field} type="text" name={"lastName"+index}/></label></label><br/></div>})}
        <label> Link til artiklen <input type="text"/></label>
        <label> Er atiklen gratis? <input type="checkbox"/></label>
        <label> Link til artiklen <input type="text"/></label>
        <input type="button" onClick={() =>{
        setAuthorField([...authorField, authorField.length+1])
        // setAuthorField([...authorField, `<input type="text" name="author"/>`])
        }} 
          value={"Add new author"} />
      </form>
      {data ? (
        <div>
          <h3>{data.pageTitle}</h3>
          {data.pageBody.map((item) => (
            <div key={item._id}>
              <h5>{item.title}</h5>
              <p>{item.release}</p>
              <p>{item.year}</p>
              <p>{item.publisher}</p>
              <p>{item.author.firstName}</p>
              <p>{item.author.lastName}</p>
              <a>{item.link}</a>
              {/* pay skal laves om */}
              <p>{item.pay}</p>
              <p>{item.resume}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p> // Loading text hvis data ikke kan hentes
      )}
    </div>
  );
}
