import style from "./side-bar.module.css"

export default function Sidebar() {
  return (
    <aside className={style.sidebar}>
        <a className={style.logo} href="#top">
            <img src="/concept-logo.jpg" width="30" height="30" alt="" />
          <span>papercritic</span>
        </a>

        <nav className={style["side-nav"]}>
          <a className={`${style["nav-link"]} ${style["is-active"]}`} href="#top">Discover</a>
          <a className={style["nav-link"]} href="#favorites">Favorites</a>
        </nav>
      </aside>
  );
}