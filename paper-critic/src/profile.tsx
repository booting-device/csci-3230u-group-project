import styles from "./profile.module.css";
import { useState, useEffect } from "react";
import { BookCard, BookGrid } from "./components/book/book";
import { navigateTo } from "./navigation";
import { Book } from "./concept/book";

interface ProfileProps {
  favorites: string[];
}

function Profile({favorites}: ProfileProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const visibleBooks = activeFilter === "all" || activeFilter === "favorites" ? books : [];

  useEffect(() => {
    const controller = new AbortController();

    async function fetchBooks() {
      try {
        setIsLoading(true);
        setError(null);
        const results = await Promise.all(
          favorites.map(async (isbn) => {
            const response = await fetch(
              `/api/isbn/${encodeURIComponent(isbn)}`,
              { signal: controller.signal }
            );
            if (!response.ok) {
              throw new Error(
                response.status === 404
                  ? `Book with ISBN ${isbn} was not found.`
                  : "Unable to load books."
              );
            }

            const data: unknown = await response.json();
            return Book.fromJSON(data);
          })
        );
        setBooks(results);
      } catch (loadError) {
        if (controller.signal.aborted) return;
        setError(loadError instanceof Error ? loadError.message : "Unable to load books.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void fetchBooks();
    return () => controller.abort();
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
        {isLoading && <p>Loading books...</p>}
        {error && <p role="alert">{error}</p>}
        {!isLoading && !error && visibleBooks.length === 0 && <p>Nothing here yet!</p>}

        <BookGrid>
          {!isLoading && !error && visibleBooks.map((book) => (
            <a
              key={book.isbn}
              href={`/details/${book.isbn}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(`/details/${book.isbn}`);
              }}
            >
              <BookCard book={book}/>
            </a>
          ))}
        </BookGrid>
      </div>
    </section>
  </div>
  );
}

export default Profile;