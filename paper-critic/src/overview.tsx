import { Fragment, useState } from "react";
import styles from "./overview.module.css";
import { BookCard, BookGrid } from "./components/book/book";
import TopBar from "./components/top-bar/top-bar";

const recommendations = [
  {
    title: "The Diary of a Wimpy Kid",
    author: "Jeff Kinney",
    cover: "https://covers.openlibrary.org/b/isbn/9781419741852-L.jpg",
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    cover: "https://covers.openlibrary.org/b/isbn/9780439023481-L.jpg",
  },
  {
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    cover: "https://covers.openlibrary.org/b/isbn/9781635575569-L.jpg",
  },
  {
    title: "It Ends with Us",
    author: "Colleen Hoover",
    cover: "https://covers.openlibrary.org/b/isbn/9781982143657-L.jpg",
  },
];

function Review({
  name,
  rating,
  children,
}: {
  name: string;
  rating: number;
  children: React.ReactNode;
}) {
  return (
    <article className={styles.review}>
      <div className={styles.avatar} aria-hidden="true">
        {name.charAt(0)}
      </div>
      <div className={styles["review-content"]}>
        <div className={styles["review-heading"]}>
          <b>{name}</b>
          <div className={styles["review-rating"]} aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) => (
              <span
                className={index < rating ? styles["star-activated"] : ""}
                key={index}
                aria-hidden="true"
              >
                ★
              </span>
            ))}
          </div>
        </div>
        {children}
      </div>
    </article>
  );
}

export default function Overview() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <main id="top" className={styles["main-content"]}>
      <TopBar />
      <div className={styles["page-content"]}>
        <div className={styles["upper-section"]}>
          <section id="book-info" className={styles["book-section"]} aria-labelledby="book-title">
            <article className={styles["featured-book"]}>
              <img
                className={styles["featured-cover"]}
                src="https://covers.openlibrary.org/b/isbn/9780140328721-L.jpg"
                alt="Cover of The Fantastic Mr. Fox"
              />
              <div className={styles["featured-copy"]}>
                <p className={styles.eyebrow}>Book of the day</p>
                <h1 id="book-title">The Fantastic Mr. Fox</h1>
                <p className={styles.author}>By Roald Dahl</p>
                <p className={styles.description}>
                  An urbane fox cannot resist returning to his farm-raiding ways, then must help
                  his community survive the farmers&apos; retaliation.
                </p>
              </div>
            </article>

            <div id="favorites" className={styles["book-actions"]}>
              <fieldset className={styles["star-rating"]}>
                <legend>Rate this book</legend>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <Fragment key={rating}>
                    <input
                      id={`rating-${rating}`}
                      name="rating"
                      type="radio"
                      value={rating}
                      aria-label={`${rating} stars`}
                    />
                    <label htmlFor={`rating-${rating}`} title={`${rating} stars`}>
                      ★
                    </label>
                  </Fragment>
                ))}
              </fieldset>
              <button
                className={`${styles["favorite-button"]} ${
                  isFavorite ? styles["is-favorite"] : ""
                }`}
                type="button"
                aria-pressed={isFavorite}
                onClick={() => setIsFavorite((favorite) => !favorite)}
              >
                <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
                {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
              </button>
            </div>
          </section>

          <section
            id="more-like-this"
            className={styles["recommendations-section"]}
            aria-labelledby="recommendations-heading"
          >
            <h2 id="recommendations-heading">More like this</h2>
            <BookGrid className={styles["recommendations-grid"]}>
              {recommendations.map((book) => (
                <BookCard
                  key={book.title}
                  title={book.title}
                  author={book.author}
                  cover={book.cover}
                />
              ))}
            </BookGrid>
          </section>
        </div>

        <section id="reviews" className={styles["reviews-section"]} aria-labelledby="reviews-heading">
          <h2 id="reviews-heading">Reader reviews</h2>
          <div className={styles.reviews}>
            <Review name="Mr. Smart" rating={5}>
              <p>
                A clever, funny adventure with a memorable cast of characters. A delight to read
                together.
              </p>
            </Review>
            <Review name="Mr. Evil" rating={1}>
              <p>This book SUCKS!</p>
            </Review>
          </div>
        </section>
      </div>
    </main>
  );
}
