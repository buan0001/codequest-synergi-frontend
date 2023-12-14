// import "dotenv/config"

export default async function tryCatch(path, method, body ) {
  const host = "https://codequest-synergi-backend.azurewebsites.net/";
  // const host = "http://localhost:3333/";
  // const host = import.meta.env.REACT_APP_ONLINE_SERVICE || "http://localhost:3333/";

  const options = {};
  if (method) {
    options.method = method;
  }
  if (body) {
    options.body = JSON.stringify(body);
  }
  if (options.body) {
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  try {
    const response = options.method ? await fetch(host + path, options) : await fetch(host + path);
    console.log("response",response);
    if (!response.ok) {
      console.error("Bad fetch:", response);
      return response;
    }
    return response;
  } catch (error) {
    console.error("Der opstod en fejl ved indlæsning af data:", error);
    return error;
  }
}

// HTTPErrorHandling - nyt navn 