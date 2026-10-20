import style from "./top-bar.module.css"

export default function TopBar() {
  return (
    <header className={style["topbar"]}>
      <form className={style["search"]} role="search" action="#more-like-this">
        <input type="search" placeholder="Search books, authors, or genres"/>
      </form>
    </header>
  );
}