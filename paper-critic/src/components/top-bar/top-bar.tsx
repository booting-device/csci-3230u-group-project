import style from "./top-bar.module.css"

export default function TopBar({ searchTarget = "#more-like-this" }: { searchTarget?: string }) {
  return (
    <header className={style["topbar"]}>
      <form className={style["search"]} role="search" action={searchTarget}>
        <input type="search" placeholder="Search books, authors, or genres"/>
      </form>
    </header>
  );
}