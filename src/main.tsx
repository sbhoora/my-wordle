import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Wordle from './Wordle.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <Wordle />
  </StrictMode>,
)
