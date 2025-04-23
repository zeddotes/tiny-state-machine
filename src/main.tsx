import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import App from './App'
import { ModuloCalculatorProvider } from './contexts/ModuloCalculatorContext'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <ModuloCalculatorProvider>
      <App />
    </ModuloCalculatorProvider>
  </React.StrictMode>
) 