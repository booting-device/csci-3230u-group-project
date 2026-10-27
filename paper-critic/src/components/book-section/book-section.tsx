import { navigateTo } from "../../navigation";
import type { Book } from "../../concept/book";
import styles from "./book-section.module.css";


export default function BookSection({
  id,
  title,
  books,
}: {
  id: string;
  title: string;
  books: Book[];
}) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`}>{title}</h2>
      <div className={styles["book-grid"]}>
        {books.map((book) => (
          <article className={styles["book-card"]} key={book.title}>
            <a
              className={styles["cover-link"]}
              onClick={() => navigateTo(`/details/${book.isbn}`)}
              aria-label={book.title}
            >
              <img className={styles["book-cover"]} src={book.cover} alt={`Cover of ${book.title}`} />
            </a>
            <div className={styles["book-info"]}>
              <p>{book.author}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
