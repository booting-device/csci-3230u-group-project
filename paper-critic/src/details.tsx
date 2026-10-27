import styles from "./details.module.css";
import { BookCard, BookGrid } from "./components/book/book";
import BookActions from "./components/book-actions/book-actions";
import ReviewSection from "./components/review-section/review-section";
import { useEffect, useState } from "react";
import { Book } from "./concept/book";

// 1. Define the props interface
interface DetailProps {
  isbn: string;
  favorites: string[];
  toggleFavorite: (isbn: string) => void;
}

export default function Details(props: DetailProps) {
  const [bookData, setBookData] = useState<Book | Error | null>(null);
  const [recommendations, setRecommendations] = useState<Book[] | Error | null>([]);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const response = await fetch(`/api/isbn/${encodeURIComponent(props.isbn)}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(response.status === 404 ? "Book not found." : "Unable to load book.");
        }

        const data: unknown = await response.json();
        setBookData(Book.fromJSON(data));
      } catch (error) {
        if (controller.signal.aborted) return;
        setBookData(error instanceof Error ? error : new Error("Unable to load book."));
      }
    })();

    return () => controller.abort();
  }, [props.isbn]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRecommendations() {
      try {
        const response = await fetch("/api/similar", { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Unable to load recommendations.");
        }

        const data: unknown = await response.json();
        if (!Array.isArray(data)) {
          throw new TypeError("Recommendation response must be an array.");
        }

        setRecommendations(data.map((book) => Book.fromJSON(book)));
      } catch (error) {
        if (controller.signal.aborted) return;
        setRecommendations(
          error instanceof Error ? error : new Error("Unable to load book.")
        );
      }
    }

    void fetchRecommendations();
    return () => controller.abort();
  }, []);

  if (bookData === null) {
    return <p>Loading book...</p>;
  }

  if (bookData instanceof Error) {
    return <p role="alert">{bookData.message}</p>;
  }

  return (
    <div className={styles["page-content"]}>
      <div className={styles["upper-section"]}>
        <section id="book-info" className={styles["book-section"]} aria-labelledby="book-title">
          <article className={styles["featured-book"]}>
            {bookData.cover ? (
              <img
                className={styles["featured-cover"]}
                src={bookData.cover}
                alt={`Cover of ${bookData.title}`}
              />
            ) : (
              <p>No cover available.</p>
            )}

            <div className={styles["featured-copy"]}>
              <h1 id="book-title">{bookData.title}</h1>
              <p className={styles.author}>By {bookData.author || "Unknown author"}</p>
              <p className={styles.description}>
                {bookData.description || "No description available."}
              </p>
              <p>
                <strong>Genres: </strong>
                {bookData.genres.length > 0
                  ? bookData.genres.join(", ")
                  : "No genres available."}
              </p>
              <p>
                <strong>First published: </strong>
                {bookData.publicationYear || "Publication year unavailable."}
              </p>
            </div>
          </article>
          <div id="favorites">
            <BookActions isFavorite={props.favorites.includes(props.isbn)} onToggleFavorite={() => props.toggleFavorite(props.isbn)}/>
          </div>
        </section>

        <section
          id="more-like-this"
          className={styles["recommendations-section"]}
          aria-labelledby="recommendations-heading"
        >
          <h2 id="recommendations-heading">More like this</h2>
          {recommendations instanceof Error? (
            <p role="alert">{recommendations.message}</p>
          ) : (
            recommendations == null? <></> : 
            <BookGrid className={styles["recommendations-grid"]}>
              {recommendations.map((book) => (
                <BookCard
                  key={book.isbn}
                  title={book.title}
                  author={book.author}
                  cover={book.cover}
                />
              ))}
            </BookGrid>
          )}
        </section>
      </div>

      <section id="reviews" className={styles["reviews-section"]} aria-labelledby="reviews-heading">
        <h2 id="reviews-heading">Reader reviews</h2>
        <div className={styles.reviews}>
          <ReviewSection isbn={props.isbn} />
        </div>
      </section>
    </div>
  );
}
