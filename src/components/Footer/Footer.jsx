import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contacts">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h2 className="footer-brand">ARTECO</h2>
            <p className="footer-desc">Премиальная мебель и интерьеры, доведенные до совершенства.</p>
          </div>
          
          <div className="footer-grid">
            <div className="footer-col">
              <h4 className="footer-title">Навигация</h4>
              <nav className="footer-nav">
                <a href="#catalog">Каталог</a>
                <a href="#about">О нас</a>
                <a href="#projects">Проекты</a>
                <a href="#faq">FAQ</a>
              </nav>
            </div>
            
            <div className="footer-col">
              <h4 className="footer-title">Контакты</h4>
              <div className="footer-contact-info">
                <a href="tel:+12345678900" className="contact-link">+1 (234) 567-8900</a>
                <a href="mailto:info@arteco.ge" className="contact-link">info@arteco.ge</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 ARTECO. Все права защищены.</p>
          <div className="footer-social">
            <a href="#">IG</a>
            <a href="#">FB</a>
            <a href="#">LN</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
