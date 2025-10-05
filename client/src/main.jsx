import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Books from './pages/books.jsx'
import Admin from './pages/admin.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/books" element={<Books />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>  
  </StrictMode>,
)
