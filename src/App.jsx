import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import { ModalProvider } from './ModalContext';
import './App.css';

function App() {
  return (
    <ModalProvider>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/project/:projectId" element={<ProjectPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ModalProvider>
  );
}

export default App;
