import { BookCard, BookGrid } from "./components/book/book";
import style from "./page.module.css"
import TopBar from "./components/top-bar/top-bar";


export default function Home() {
  return (
    <main id="top" className={style["main-content"]}>
        <TopBar />
        <section id="top-picks" className={style.section}>
          <center>
            <h2>Top Picks</h2> 
          </center>
          <BookGrid>
            <BookCard title="The Fantastic Mr. Fox!" author="Roald Dahl" cover="https://covers.openlibrary.org/b/isbn/9780140328721-L.jpg"/>
            <BookCard title="It Ends with us!" author="Colleen Hoover" cover="https://covers.openlibrary.org/b/isbn/978-1982143657-L.jpg"/>
            <BookCard title="The Court of Thorns and Roses" author="Sarah J. Maas" cover="https://covers.openlibrary.org/b/isbn/978-1635575569-L.jpg"/>
          </BookGrid>
        </section>

        <section id="favorites" className={style.section}>
          <center>
            <h2>Our Favourites</h2> 
          </center>
          <BookGrid>
            <BookCard title="The Diary of a Wimpy Kid." author="Jeff Kinney" cover="https://covers.openlibrary.org/b/isbn/978-1-4197-4185-2-L.jpg"></BookCard>
            <BookCard title="The Hunger Games!" author="Suzanne Collins" cover="https://covers.openlibrary.org/b/isbn/978-0439023481-L.jpg"></BookCard>
            <BookCard title="It Ends with us!" author="George Orwell" cover="https://covers.openlibrary.org/b/isbn/978-1635575569-L.jpg"></BookCard>
          </BookGrid>
        </section>
    </main>
  );
}