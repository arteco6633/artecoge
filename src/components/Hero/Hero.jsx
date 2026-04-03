import React, { useState, useEffect } from 'react';
import './Hero.css';
import heroBg from '../../assets/hero_background.png';
import bg1 from '../../assets/catalog_kitchen.png';
import bg2 from '../../assets/catalog_storage.png';
import bg3 from '../../assets/hero_background.png';

const usps = [
  { num: '01', title: 'Работаем по договору', img: bg1 },
  { num: '02', title: 'Собственная установка', img: bg2 },
  { num: '03', title: 'Собственное производство', img: bg3 }
];

const Hero = () => {
  const [activeUsp, setActiveUsp] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveUsp((prev) => (prev + 1) % usps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextUsp = () => setActiveUsp((prev) => (prev + 1) % usps.length);
  const prevUsp = () => setActiveUsp((prev) => (prev === 0 ? usps.length - 1 : prev - 1));

  return (
    <section className="hero" id="home">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }}></div>
      <div className="hero-overlay"></div>
      


      <div className="container hero-content-wrapper">
        <div className="hero-content">
          <p className="hero-subtitle">
            Реализуем сложные архитектурные решения. Подбираем текстуру дерева лично под ваш характер и стиль интерьера.
          </p>
          <h1 className="hero-title">
            АВТОРСКАЯ <span className="highlight-text">МЕБЕЛЬ</span> ПО ДИЗАЙН ПРОЕКТУ
          </h1>
          <button className="btn-light-pill">Индивидуальный подбор ↘</button>
        </div>

        <div className="hero-bottom">
          <div className="social-pill">
            <a href="#instagram" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#facebook" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#telegram" aria-label="Telegram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </a>
          </div>

          <div className="hero-mini-slider">
            <div className="mini-slider-bg hero-anim-bg" key={`slider-bg-${activeUsp}`} style={{ backgroundImage: `url(${usps[activeUsp].img})` }}></div>
            <div className="mini-slider-overlay"></div>
            <div className="mini-slider-content" key={`slider-text-${activeUsp}`}>
              <span className="mini-num hero-anim-up">/{usps[activeUsp].num}</span>
              <p className="mini-title hero-anim-up-delay">{usps[activeUsp].title}</p>
            </div>
            <div className="mini-slider-controls">
              <button className="mini-arrow" onClick={prevUsp} aria-label="Previous">←</button>
              <button className="mini-arrow" onClick={nextUsp} aria-label="Next">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
