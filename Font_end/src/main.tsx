import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import { AuthProvider } from './context/AuthContext.js'
import App from './App.js'
=======
import App from './App'
>>>>>>> b94a582f10acbfc7167e178dd88ca88227b80ba8

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
