import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useModal } from '../../ModalContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useModal();

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
          <Link to="/#home" className="header-logo">ARTECO</Link>
        </div>

        {/* Center Nav Pill */}
        <nav className={`nav-pill ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/catalog" onClick={() => setMobileMenuOpen(false)}>Каталог</Link>
          <Link to="/#cooperation" onClick={() => setMobileMenuOpen(false)}>Сотрудничество</Link>
          <Link to="/#about" onClick={() => setMobileMenuOpen(false)}>О компании</Link>
          <Link to="/#projects" onClick={() => setMobileMenuOpen(false)}>Реализованные проекты</Link>
          <Link to="/#contacts" onClick={() => setMobileMenuOpen(false)}>Контакты</Link>
          <Link to="/#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
          
          <button 
            className="btn-light mobile-only" 
            onClick={() => {
              setMobileMenuOpen(false);
              openModal("Рассчитать стоимость", "Мы свяжемся с вами для уточнения деталей проекта");
            }}
          >
            Рассчитать стоимость
          </button>
        </nav>

        {/* Right CTA */}
        <div className="header-right">
          <button 
            className="btn-light desktop-only"
            onClick={() => openModal("Рассчитать стоимость", "Мы свяжемся с вами для уточнения деталей проекта")}
          >
            Рассчитать стоимость
          </button>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
