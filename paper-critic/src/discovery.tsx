import BookSection from "./components/book-section/book-section";

const topPicks = [
  {
    author: "Roald Dahl",
    cover: "https://covers.openlibrary.org/b/isbn/9780140328721-L.jpg",
    title: "The Fantastic Mr. Fox",
    isbn: "9780140328721"
  },
  {
    author: "Colleen Hoover",
    cover: "https://covers.openlibrary.org/b/isbn/9781982143657-L.jpg",
    title: "It Ends with Us",
    isbn: "9781982143657"
  },
  {
    author: "Sarah J. Maas",
    cover: "https://covers.openlibrary.org/b/isbn/9781635575569-L.jpg",
    title: "A Court of Silver Flames",
    isbn: "9781635575569"
  },
];

const popularReads = [
  {
    author: "Jeff Kinney",
    cover: "https://covers.openlibrary.org/b/isbn/9781419741852-L.jpg",
    title: "The Diary of a Wimpy Kid",
    isbn: "9781419741852"
  },
  {
    author: "Colleen Hoover",
    cover: "https://covers.openlibrary.org/b/isbn/9780439023481-L.jpg",
    title: "The Hunger Games",
    isbn: "9780439023481"
  },
  {
    author: "George Orwell",
    cover: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    title: "Nineteen Eighty-Four",
    isbn: "9780451524935"
  },
];

export default function Discovery() {
  return (
    <>
        <BookSection id="top-picks" title="Top picks" books={topPicks} />
        <BookSection id="Popular-Reads" title="Popular Reads" books={popularReads} />
    </>
  );
}