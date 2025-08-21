import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'   // Capital A
import '../css/app.css'

const container = document.getElementById('app')
if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
