export default async function tryCatch(path, query) {
    const host ='http://localhost:3333/'
    try {
        console.log(host + path,query);
    //   const response = await fetch(`${host}${path}`);
      const response = await fetch(host+path,query);
      if (!response.ok) {
        throw new Error("Der opstod en fejl ved fetch");
      }
      return await response.json();    
    } catch (error) {
        console.error("Der opstod en fejl ved indlæsning af data:", error);
        return (false)
    }
  }