import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MovieApp } from './MovieApp'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieApp/>
  </StrictMode>,
)
