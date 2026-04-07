import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import ArticlesPage from './pages/ArticlesPage/ArticlesPage';
import ArticleSingle from './pages/ArticleSingle/ArticleSingle';
import { ModalProvider } from './ModalContext';
import Admin from './pages/Admin/Admin';
import Preloader from './components/Preloader/Preloader';
import './App.css';

function App() {
  return (
    <ModalProvider>
      <Preloader />
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/project/:projectId" element={<ProjectPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:slug" element={<ArticleSingle />} />
            <Route path="/admin-panel-secret" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ModalProvider>
  );
}

export default App;
