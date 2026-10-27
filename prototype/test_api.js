import {
  searchBooks,
  getBookDetails
} from "./api.js";

async function testAPI() {
  try {
    const books = await searchBooks("Fantastic Mr Fox");

    console.log("Books found:");
    console.table(books);

    if (books.length === 0) {
      console.log("No books found.");
      return;
    }

    // Wait before sending the second request.
    await new Promise((resolve) => setTimeout(resolve, 1100));

    const book = await getBookDetails(books[0]);

    console.log("Selected book:", book);
    console.log("Description:", book.description);
  } catch (error) {
    console.error("API error:", error.message);
  }
}

testAPI();