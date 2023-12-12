export default async function tryCatch(path, query) {
  // PATH EXAMPLE:
  // "pages", "articles"
  // WITH SPECIFIC ID:
  // "pages/<id>", "blog/<id>"
  // Query can be empty or filled. Leave it empty for get requests, otherwise fill. Post example:
  //   {method: "POST",
  //   body: JSON.stringify(newArticleOrBook),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // }
  const host = "http://localhost:3333/";

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // /////////////////// COULD IMPLEMENT THIS TO SAVE SOME CODE EVERY TIME ITS CALLED //////////////////////// 
  // const options = query ? {body: JSON.stringify(newArticleOrBook),
  //   headers: {
  //     "Content-Type": "application/json",
  //   }} : {method: "GET"}

  try {
    console.log(host + path, query);
    //   const response = await fetch(`${host}${path}`);
    const response = await fetch(host + path, query);
    if (!response.ok) {
      throw new Error("Der opstod en fejl ved fetch");
    }
    return await response.json();
  } catch (error) {
    console.error("Der opstod en fejl ved indlæsning af data:", error);
    return error;
  }
}