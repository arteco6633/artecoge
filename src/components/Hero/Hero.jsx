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

import { useModal } from '../../ModalContext';

const Hero = ({ 
  title = <>АВТОРСКАЯ <span className="highlight-text">МЕБЕЛЬ</span> ПО ДИЗАЙН ПРОЕКТУ</>,
  subtitle = "Реализуем сложные архитектурные решения. Подбираем текстуру дерева лично под ваш характер и стиль интерьера.",
  showSlider = true,
  rightText = null,
  compact = false
}) => {
  const [activeUsp, setActiveUsp] = useState(0);
  const { openModal } = useModal();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveUsp((prev) => (prev + 1) % usps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextUsp = () => setActiveUsp((prev) => (prev + 1) % usps.length);
  const prevUsp = () => setActiveUsp((prev) => (prev === 0 ? usps.length - 1 : prev - 1));

  return (
    <section className={`hero ${compact ? 'hero--compact' : ''}`} id="home">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }}></div>
      <div className="hero-overlay"></div>

      <div className="container hero-content-wrapper">
        <div className={`hero-content ${compact ? 'hero-content--left' : ''}`}>
          {subtitle && (
            <p className="hero-subtitle">
              {subtitle}
            </p>
          )}
          <h1 className="hero-title">
            {title}
          </h1>
          <button 
            className="btn-light-pill"
            onClick={() => openModal("Рассчитать стоимость", "Оставьте заявку, и мы подготовим расчет для вашего проекта")}
          >
            Рассчитать стоимость ↘
          </button>
        </div>
        
        {rightText && (
          <div className="hero-right-text">
            {rightText}
          </div>
        )}

        <div className="hero-bottom">
          {!compact && (
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
          )}

          {showSlider && (
            <div className="hero-mini-slider">
              <div 
                className="mini-slider-track" 
                style={{ transform: `translateX(-${activeUsp * 100}%)` }}
              >
                {usps.map((usp, idx) => (
                  <div key={idx} className={`mini-slide ${idx === activeUsp ? 'active' : ''}`}>
                    <div className="mini-slider-bg" style={{ backgroundImage: `url(${usp.img})` }}></div>
                    <div className="mini-slider-overlay"></div>
                    <div className="mini-slider-content">
                      <span className="mini-num">/{usp.num}</span>
                      <p className="mini-title">{usp.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mini-slider-controls">
                <button className="mini-arrow" onClick={prevUsp} aria-label="Previous">←</button>
                <button className="mini-arrow" onClick={nextUsp} aria-label="Next">→</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compact social icons — simple pill */}
      {compact && (
        <div className="hero-compact-socials">
          <a href="#whatsapp" aria-label="WhatsApp">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <a href="#telegram" aria-label="Telegram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12.056 0h-.112zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          </a>
          <a href="#vk" aria-label="VK">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.18-3.61 2.18-3.61.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.745-.576.745z"/></svg>
          </a>
        </div>
      )}
    </section>
  );
};

export default Hero;
