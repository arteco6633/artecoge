import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import UspBanner from '../../components/UspBanner/UspBanner';
import Catalog from '../../components/Catalog/Catalog';
import CompanyInfo from '../../components/CompanyInfo/CompanyInfo';
import Partners from '../../components/Partners/Partners';
import CtaAnchor from '../../components/CtaAnchor/CtaAnchor';
import Projects from '../../components/Projects/Projects';
import HowWeWork from '../../components/HowWeWork/HowWeWork';
import Articles from '../../components/Articles/Articles';
import Faq from '../../components/Faq/Faq';
import FinalForm from '../../components/FinalForm/FinalForm';

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
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
    </>
  );
};

export default Home;
