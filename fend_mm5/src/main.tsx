import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client.js'
import App from './App.js'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
