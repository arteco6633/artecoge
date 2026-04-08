import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import UspBanner from '../../components/UspBanner/UspBanner';
import UnifiedPortfolio from '../../components/UnifiedPortfolio/UnifiedPortfolio';
import CompanyInfo from '../../components/CompanyInfo/CompanyInfo';
import Partners from '../../components/Partners/Partners';
import CtaAnchor from '../../components/CtaAnchor/CtaAnchor';
import HowWeWork from '../../components/HowWeWork/HowWeWork';
import Articles from '../../components/Articles/Articles';
import Faq from '../../components/Faq/Faq';
import FinalForm from '../../components/FinalForm/FinalForm';

import { motion } from 'framer-motion';

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const revealProps = {
    initial: { opacity: 0, y: 80, scale: 0.95, filter: 'blur(10px)' },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    viewport: { once: false, amount: 0.15 },
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1], // Quintic easeOut for a "premium silk" feel
      delay: 0.1
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Hero btnLink="/catalog" />
      <motion.div {...revealProps}><UspBanner /></motion.div>
      <motion.div {...revealProps}><UnifiedPortfolio /></motion.div>
      <motion.div {...revealProps}><CompanyInfo /></motion.div>
      <motion.div {...revealProps}><Partners /></motion.div>
      <motion.div {...revealProps}><CtaAnchor /></motion.div>
      <motion.div {...revealProps}><HowWeWork /></motion.div>
      <motion.div {...revealProps}><Articles /></motion.div>
      <motion.div {...revealProps}><Faq /></motion.div>
      <motion.div {...revealProps}><FinalForm /></motion.div>
    </motion.div>
  );
};

export default Home;
