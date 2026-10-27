
import { useEffect, useState } from 'react'
import Details from './details.tsx'
import Discovery from './discovery.tsx'
import Profile from './profile.tsx'

export default function MainContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [favorites, setFavorites] = useState<string[]>(() => {const saved = localStorage.getItem("favorites"); return saved ? JSON.parse(saved) : [];});

  function toggleFavorite(isbn: string) {
  setFavorites((previousFavorites) => previousFavorites.includes(isbn) ? previousFavorites.filter((id) => id !== isbn) : [...previousFavorites, isbn]);
  }

  useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('customnavigation', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('customnavigation', handlePopState)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [currentPath])

  const NOT_FOUND = <a>Page not found</a>;;
  let node = NOT_FOUND
  let path_split = currentPath.split('/');
  while (path_split.length > 0 && path_split.at(-1) === "") path_split.pop()
  while (path_split.length > 0 && path_split.at(0) === "") path_split.shift()
  if (path_split.length == 0) return <Discovery></Discovery>

  // first argument
  switch (path_split.shift()) {
    case "details":
      let book_isbn = path_split.shift()
      if (book_isbn != undefined) node = <Details isbn={book_isbn} favorites={favorites} toggleFavorite={toggleFavorite} />
      break;

    case "profile": 
      node = <Profile favorites={favorites}/>
      break;

    default: node = NOT_FOUND
  }

  if (path_split.shift() != undefined) node = NOT_FOUND
  return node

}


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'

import Sidebar from './components/side-bar/side-bar.tsx'
import TopBar from './components/top-bar/top-bar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sidebar />

    <main id="top" className="main-content mobile-main-content">
      <TopBar/>
      <MainContent/>
    </main>
  </StrictMode>,
)
