import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { AuthContextProvider } from './contexts/AuthContext'

// import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
)
