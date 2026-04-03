import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import UspBanner from './components/UspBanner/UspBanner';
import Catalog from './components/Catalog/Catalog';
import CompanyInfo from './components/CompanyInfo/CompanyInfo';
import Partners from './components/Partners/Partners';
import CtaAnchor from './components/CtaAnchor/CtaAnchor';
import Projects from './components/Projects/Projects';
import HowWeWork from './components/HowWeWork/HowWeWork';
import Articles from './components/Articles/Articles';
import Faq from './components/Faq/Faq';
import FinalForm from './components/FinalForm/FinalForm';

import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <UspBanner />
        <Catalog />
        <CompanyInfo />
        <Partners />
        <CtaAnchor />
        <Projects />
        <HowWeWork />
        <Articles />
        <Faq />

        <FinalForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
