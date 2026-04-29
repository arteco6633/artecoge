import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ModalProvider } from './ModalContext';
import Preloader from './components/Preloader/Preloader';
import './App.css';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home/Home'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage/ProjectPage'));
const ArticlesPage = lazy(() => import('./pages/ArticlesPage/ArticlesPage'));
const ArticleSingle = lazy(() => import('./pages/ArticleSingle/ArticleSingle'));
const Admin = lazy(() => import('./pages/Admin/Admin'));

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin-panel-secret');

  return (
    <ModalProvider>
      <Preloader />
      <div className="app">
        {!isAdminPath && <Header />}
        <main>
          <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#F0EDE9' }} />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:projectId" element={<ProjectPage />} />
              <Route path="/project/:projectId" element={<ProjectPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/article/:slug" element={<ArticleSingle />} />
              <Route path="/admin-panel-secret" element={<Admin />} />
            </Routes>
          </Suspense>
        </main>
        {!isAdminPath && <Footer />}
      </div>
    </ModalProvider>
  );
}

export default App;
