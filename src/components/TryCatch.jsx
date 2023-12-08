export default async function tryCatch(path, query) {
    const host ='http://localhost:3333/'
    try {
        console.log(`${host}${path}`,{method:"GET"});
    //   const response = await fetch(`${host}${path}`);
      const response = await fetch(`${host}${path}`,{method:"GET"});
      if (!response.ok) {
        throw new Error("Der opstod en fejl ved fetch");
      }
      return await response.json();    
    } catch (error) {
        console.error("Der opstod en fejl ved indlæsning af data:", error);
        return (false)
    }
  }