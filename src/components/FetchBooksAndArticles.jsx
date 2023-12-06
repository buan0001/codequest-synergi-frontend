import { useState, useEffect } from "react";

export default function FetchComponent() {
  const [data, setData] = useState("");
  const [authorField, setAuthorField] = useState([0]);
  const [newPost, setNewPost] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3333/articles");
        if (!response.ok) {
          throw new Error("Der opstod en fejl ved fetch");
        }
        const result = await response.json();
        console.log("RESULT", result);
        setData(result);
      } catch (error) {
        console.error("Der opstod en fejl ved indlæsning af data:", error);
      }
    }

    fetchData();
  }, [newPost]); // Dependency that decides how many times the effect runs


  async function handleSubmit(event) {

    const form = event.target;
    
    const newArticle = {
      title: form.title.value,
      releaseYear: form.releaseYear.value,
      publisher: form.publisher.value,
      authors: authorField.map(field => {
        return { firstName: form["firstName" + field].value, lastName: form["lastName" + field].value };
      }),
      link: form.link.value,
      isPay: form.pay.checked,
      resume: form.resume.value,
    };
    console.log("new article", newArticle);

    try {
      const response = await fetch(`http://localhost:3333/articles`, {
        method: "POST",
        body: JSON.stringify(newArticle),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Der opstod en fejl ved fetch");
      }
      const result = await response.json();
      setNewPost(result)
      console.log(result);
      // setData(result);
    } catch (error) {
      console.error("Der opstod en fejl ved indlæsning af data:", error);
    }
  }

  return (
    <div style={{ padding: "10px" }}>
      <form
        style={{ display: "flex", padding: "5px", gap: "10px", flexDirection: "column" }}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" required style={{minWidth:"250px"}} onKeyUp={(e) => e.target.style.width = ((e.target.value.length + 1)) + 'ch'}/>
        </div>
        <div>
          <label htmlFor="">
            Udgivelsesår
            <input type="number" name="releaseYear" required />
          </label>
        </div>
        <label>
          Udgiver
          <input type="text" name="publisher" required style={{minWidth:"250px"}} onKeyUp={(e) => e.target.style.width = ((e.target.value.length + 1)) + 'ch'} />
        </label>
        <br />
        <div>
          {authorField.map((field, index) => {
            console.log("author field",authorField);
            return (
              <div key={field}>
                <label>
                  Forfatter {index + 1}:
                  <label>
                     Fornavn <input type="text" name={"firstName" + index} required />
                  </label>
                  <label htmlFor={"lastName" + index}>
                     Efternavn <input type="text" name={"lastName" + index} required />
                  </label>
                </label>
              </div>
            );
          })}
          <input
            type="button"
            onClick={() => {
              setAuthorField([...authorField, authorField.length]);
            }}
            value={"Add new author"}
          />
          <input
            type="button"
            onClick={() => {
              const newField = [...authorField]
              if(newField.length > 1){newField.pop();setAuthorField(newField )}
            }}
            value={"Remove latest author"}
          />
        </div>
        <br />
        <br />
        <label>
          Link til artiklen <input type="link" name="link" style={{minWidth:"250px"}} onKeyUp={(e) => e.target.style.width = ((e.target.value.length + 1)) + 'ch'} />
          {/* Link til artiklen <input type="link" name="link" style={{width:"50vw"}} /> */}
        </label>
        <label>
          Betalingsartikel? <input type="checkbox" name="pay" />
        </label>
        <label>
          Kort resume <textarea name="resume" />
        </label>
        <div>
          <input type="submit" value={"Opret artikel"} />
        </div>
      </form>
      {/* <div>{missingFields.length == 0 ? "" : "These fields must be filled"}</div>
      <div style={{display:"flex", gap:"10px"}}>{missingFields.length == 0 ? "" : missingFields.map(field =>{
        return <div key={field}>{field}</div>
      })}</div> */}

      {data ? (
        <div>
          {data.map(item => (
            <div key={item._id}>
              <h3>Title {item.title}</h3>
              {/* <p>Release {item.release}</p> */}
              <p>Year {item.releaseYear}</p>
              <p>Publisher {item.publisher}</p>
              <div> Authors:
                {item.authors.map(author => {
                  return (
                    <p key={author._id}>
                      First name: {author.firstName} Last name: {author.lastName}
                    </p>
                  );
                })}
              </div>
              {/* <p>{item.author.lastName}</p> */}
              <a>Link {item.link}</a>
              {/* pay skal laves om */}
              <p>Pay {item.pay == false ? "gratis" : "betalt"}</p>
              <p>Resume {item.resume}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p> // Loading text hvis data ikke kan hentes
      )}
    </div>
  );
}
