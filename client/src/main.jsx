import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Books from './pages/books.jsx'
import Admin from './pages/admin.jsx'
import Login from './pages/login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { AuthProvider } from './context/authContext.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>  
  </StrictMode>,
)
