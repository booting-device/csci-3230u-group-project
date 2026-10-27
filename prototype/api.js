const BASE_URL = "https://openlibrary.org";

// request JSON data from Open Library API
async function fetchJSON(url) {
  const response = await fetch(url);

  // report error if the request was unsuccessful 
  if (!response.ok) {
    throw new Error("Could not load book information: " + response.status);
  }

  // convert JSON response to JS data 
  return response.json();
}

// create a cover image URL
export function getCoverUrl(coverId) {
  // return null if there is no cover ID
  if (!coverId || coverId <= 0) {
    return null;
  }

  return "https://covers.openlibrary.org/b/id/" + coverId + "-L.jpg";
}

// search for books by title, author, or a query like "subject:fantasy".
export async function searchBooks(query) {
  if (query.trim() === "") {
    return [];
  }

    // build a search URL requesting up to 10 books with specific fields
  const url = BASE_URL + "/search.json?q="
    + encodeURIComponent(query.trim())
    + "&limit=10"
    + "&fields=key,title,author_name,first_publish_year,cover_i";

  // fetch the search results 
  const data = await fetchJSON(url);

  // convert each search result into a simpler book object
  return data.docs.map((book) => {
    let author = "Unknown author";

    // joins multiple author names into one string
    if (book.author_name && book.author_name.length > 0) {
      author = book.author_name.join(", ");
    }

    let id = book.key;

    if (!id.startsWith("/works/")) {
      id = "/works/" + id;
    }

    // return the book information with defaults for missing values
    return {
      id: id,
      title: book.title || "Untitled",
      author: author,
      year: book.first_publish_year || null,
      cover: getCoverUrl(book.cover_i)
    };
  });
}

// get more information about a book returned by searchBooks
export async function getBookDetails(book) {
  // build the URL for the selected book's details
  const url = BASE_URL + book.id + ".json";
  // fetch the book's details
  const data = await fetchJSON(url);

  // use default text if no description is provided
  let description = "No description available.";

  // use the description if it is a nonempty string
  if (typeof data.description === "string" && data.description.trim() !== "") {
    description = data.description;
  } 
  // otherwise, check for description text inside the value property
  else if (
    data.description
    && typeof data.description.value === "string"
    && data.description.value.trim() !== ""
  ) {
    description = data.description.value;
  }

  // copy the original book information and add its description and subjects
  return {
    ...book,
    description: description,
    subjects: data.subjects || []
  };
}