import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'

import Sidebar from './components/side-bar/side-bar.tsx'
import Overview from './overview.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <Sidebar />
      <Overview />
    </>
  </StrictMode>,
)
