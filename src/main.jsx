import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter as Router } from 'react-router-dom'
import { ContextProvider } from './Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <ContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ContextProvider>
  </Router>,
)
