import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        
        {/* Left Side Logo */}
        <div className="header-left">
          <a href="#home" className="header-logo">ARTECO</a>
        </div>

        {/* Center Nav Pill */}
        <nav className={`nav-pill ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#catalog" onClick={() => setMobileMenuOpen(false)}>Каталог</a>
          <a href="#cooperation" onClick={() => setMobileMenuOpen(false)}>Сотрудничество</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>О компании</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Реализованные проекты</a>
          <a href="#contacts" onClick={() => setMobileMenuOpen(false)}>Контакты</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          
          <button className="btn-light mobile-only">Рассчитать стоимость</button>
        </nav>

        {/* Right CTA */}
        <div className="header-right">
          <button className="btn-light desktop-only">Рассчитать стоимость</button>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
