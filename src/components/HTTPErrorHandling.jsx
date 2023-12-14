export default async function HTTPErrorHandling(path, method, body) {
  const host = "https://codequest-synergi-backend.azurewebsites.net/";

  const options = {};

  // Set the HTTP method if provided
  if (method) {
    options.method = method;
  }

  // Set the request body if provided
  if (body) {
    options.body = JSON.stringify(body);
  }

  // Set the request headers if body is present
  if (options.body) {
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  try {
    // Make the API request
    const response = options.method ? await fetch(host + path, options) : await fetch(host + path);

    // Check if the response is not OK
    if (!response.ok) {
      console.error("Bad fetch:", response);
      return response;
    }

    return response;
  } catch (error) {
    console.error("An error occurred while loading data:", error);
    return error;
  }
}
