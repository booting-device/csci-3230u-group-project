import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import { BookCard, BookGrid } from "./components/book/book";
import { navigateTo } from "./navigation";

interface ProfileProps {
  favorites: string[];
}

interface Book {
  isbn: string;
  title: string;
  author: string;
  cover: string;
}

function Profile({favorites}: ProfileProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [books, setBooks] = useState<Book[]>([]);
  const visibleBooks = activeFilter === "all" || activeFilter === "favorites" ? books : [];

  useEffect(() => {
  async function fetchBooks() {
    const results = await Promise.all(
      favorites.map(async (isbn) => {
        const response = await fetch(
          `https://openlibrary.org/search.json?isbn=${isbn}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }

        const data = await response.json();
        const book = data.docs[0];

        if (!book) return null;

        return {
          isbn: isbn,
          title: book.title,
          author: book.author_name?.[0] || "Unknown Author",
          cover: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
        };
      })
    );

    setBooks(results.filter((book): book is Book => book !== null));
  }

  fetchBooks().catch((error) => console.error(error));
  }, [favorites]);


  return (
  <div className={styles.profile}>
    <h1> Welcome Reader!</h1>
    <p> Your digital library awaits. </p>

    <section>
      <h2>My Books</h2>

      <div className={styles.filters}>
        <button className={activeFilter === "all" ? styles.active : ""} onClick={() => setActiveFilter("all")}> All Books</button>
        <button className={activeFilter === "favorites" ? styles.active : ""} onClick={() => setActiveFilter("favorites")}> Favorites</button>
        <button className={activeFilter === "new" ? styles.active : ""} onClick={() => setActiveFilter("new")}> New</button>
        <button className={activeFilter === "currently reading" ? styles.active : ""} onClick={() => setActiveFilter("currently reading")}> Currently Reading</button>
        <button className={activeFilter === "completed" ? styles.active : ""} onClick={() => setActiveFilter("completed")}> Completed</button>
      </div>

      <div className={styles["bookshelf-grid"]}>
        {visibleBooks.length === 0 && (<p>Nothing here yet!</p>)}

        <BookGrid>
          {visibleBooks.map((book) => (
            <a
              key={book.isbn}
              href={`/details/${book.isbn}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(`/details/${book.isbn}`);
              }}
            >
              <BookCard
                  title={book.title}
                  author={book.author}
                  cover={book.cover}
              />
            </a>
          ))}
        </BookGrid>
      </div>
    </section>
  </div>
  );
}

export default Profile;