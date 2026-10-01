

import style from "./book.module.css"



export function BookCard({ title,  cover, author }: { title: string, cover: string, author:String}) {
  return (
    <article className={style["book-card"]}>
        <a className={style["cover-link"]} href="book_concept.html">
        <img className={style["book-cover"]} src={cover} alt={"Cover of " + title}/>
        </a>
        <div className={style["book-info"]}>
        <p>{author}</p>
        </div>
    </article>
  );
}

export function BookGrid({children} : {children: React.ReactNode}) {
    return (
        <div className={style["book-grid"]}>{children}</div>
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