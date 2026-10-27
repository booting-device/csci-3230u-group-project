

import type { Book } from "../../concept/book";
import { navigateTo } from "../../navigation";
import style from "./book.module.css"



export function BookCard({ book }: { book: Book }) {
  return (
    <article className={style["book-card"]}>
        <a className={style["cover-link"]} onClick={(e) =>
        {
            e.preventDefault();
            navigateTo(`/details/${book.isbn}`);
        }}>
        <img className={style["book-cover"]} src={book.cover} alt={"Cover of " + book.title}/>
        </a>
        <div className={style["book-info"]}>
        <div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
        </div>
    </article>
  );
}

export function BookGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
    return (
        <div className={`${style["book-grid"]} ${className ?? ""}`}>{children}</div>
    )
}


export function MiniBookQuad({children} : {children: React.ReactNode}) {
    return (
        <div className={style["book-grid"]}>{children}</div>
    )
}

export function MiniBook({children} : {children: React.ReactNode}) {
    return (
        <div className={style["book-grid"]}>{children}</div>
    )
}