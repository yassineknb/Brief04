// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GlobalProvider } from './context/GlobalContext.jsx'; // <-- 1. IMPORTER LE PROVIDER

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider> {/* <-- 2. ENVELOPPER L'APP */}
      <App />
    </GlobalProvider>
  </React.StrictMode>,
)