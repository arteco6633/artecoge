import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { LangProvider } from './i18n/context.jsx';
import { MotionConfig } from 'framer-motion';
import './index.css'

const isMobile = window.innerWidth <= 900;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <MotionConfig reducedMotion={isMobile ? 'always' : 'never'}>
          <App />
        </MotionConfig>
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
