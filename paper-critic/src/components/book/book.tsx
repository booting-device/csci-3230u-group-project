

import style from "./book.module.css"



export function BookCard({ title, cover, author }: { title: string; cover: string; author: string }) {
  return (
    <article className={style["book-card"]}>
        <a className={style["cover-link"]}>
        <img className={style["book-cover"]} src={cover} alt={"Cover of " + title}/>
        </a>
        <div className={style["book-info"]}>
        <div>
          <h3>{title}</h3>
          <p>{author}</p>
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