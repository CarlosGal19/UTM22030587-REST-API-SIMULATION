const books = require("./books.json");

function sendReponse(code, body = null) {
  const response = {
    code,
    body,
  };

  switch (code) {
    case 200:
      response.msg = "Ok";
      break;
    case 400:
      response.msg = "Endpoint not valid";
      break;
    case 401:
      response.msg = "The book already exists";
      break;
    case 404:
      response.msg = "Not found";
      break;
    case 500:
      response.msg = "Internal Server Error";
      break;
    default:
      response.msg = "Unknown status code";
  }

  return response;
}

function getBook(endpoint) {
  try {
    if (!endpoint) {
      return sendReponse(400);
    }

    const isbn = parseInt(endpoint);

    if (!isbn) {
      for (const book of books) {
        if (book.title === endpoint) {
          return sendReponse(200, "Found by title");
        }
      }
    }

    for (const book of books) {
      if (book.ISBN == isbn) {
        return sendReponse(200, "Found by ISBN");
      }
    }

    return sendReponse(404);
  } catch (error) {
    return sendReponse(500, error);
  }
}

console.log(getBook("9780399590504"));