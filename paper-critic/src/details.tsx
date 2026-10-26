import styles from "./details.module.css";
import { BookCard, BookGrid } from "./components/book/book";
import BookActions from "./components/book-actions/book-actions";
import Review from "./components/review/review";
import { useEffect, useState } from "react";

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

// 1. Define the props interface
interface DetailProps {
  isbn: string;
  favorites: string[];
  toggleFavorite: (isbn: string) => void;
}

export default function Details(props: DetailProps) {
  const [libraryData, setlibraryData] = useState<any>(null);
  const [cover, setCover] = useState<string>("");

  useEffect(() => {
    console.log("Fetching cover and other junk")
    fetch(`https://covers.openlibrary.org/b/isbn/${props.isbn}-L.jpg`).then((response) => {
      if (!response.ok) throw new Error('Network response failed');
      return response.blob(); 
    }).then((blob) => {
      setCover(URL.createObjectURL(blob));
    })

    fetch(`https://openlibrary.org/search.json?isbn=${props.isbn}`).then((response) => {
      if (!response.ok) throw new Error('Network response failed');
      return response.json(); 
    }).then((jsonData) => {
      setlibraryData(jsonData.docs[0])
    })



    return () => {
      if (cover) {
        URL.revokeObjectURL(cover);
      }
    }; 
  }, []);

  
  let title:string|null = libraryData && libraryData.title;
  let authors:string[]|null = libraryData && libraryData.author_name
  let author_string:string|null = authors && (authors.length == 1? authors[0] : `${authors.slice(0, -1).join(", ")}, and ${authors.at(-1)}`);
  

  return (
      libraryData && title && <div className={styles["page-content"]}>
        <div className={styles["upper-section"]}>
          <section id="book-info" className={styles["book-section"]} aria-labelledby="book-title">
            <article className={styles["featured-book"]}>
              <img
                className={styles["featured-cover"]}
                src={cover}
                alt= {`Cover of ${title}`}
              />
              <div className={styles["featured-copy"]}>
                <h1 id="book-title">{title}</h1>
                <p className={styles.author}>By {author_string}</p>
                <p className={styles.description}>
                  No description yet.
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
              <p>A clever, funny adventure with a memorable cast of characters. A delight to read together.</p>
            </Review>
            <Review name="Mr. Evil" rating={1}>
              <p>This book SUCKS!</p>
            </Review>
          </div>
        </section>
      </div>
  );
}
