import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';
import { useModal } from '../../ModalContext';
import logoMobile from '../../assets/logo-mobile.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useModal();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Каталог', path: '/catalog' },
    { name: 'Проекты', href: '#projects' },
    { name: 'О нас', href: '#about' },
    { name: 'Статьи', path: '/articles' },
    { name: 'Контакты', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link) => {
    setIsMenuOpen(false);
    if (link.path) {
      navigate(link.path);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Desktop Left: Full Logo */}
        <div className="header-left desktop-only">
          <a href="/" className="header-logo">
            ARTECO
          </a>
        </div>

        {/* Mobile Left: Icon Logo */}
        <div className="header-left-mobile mobile-only">
          <a href="/" className="header-logo-icon-img">
            <img src={logoMobile} alt="ARTECO" />
          </a>
        </div>

        {/* Desktop Center: Navigation Pill */}
        <nav className="header-nav-pill desktop-only">
          {navLinks.map((link) => (
            link.path ? (
              <button key={link.name} onClick={() => handleNavClick(link)} className="nav-link">
                {link.name}
              </button>
            ) : (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            )
          ))}
        </nav>

        {/* Mobile Center: CTA Button */}
        <div className="header-center-mobile mobile-only">
          <button 
            className="btn-header-cta-mobile"
            onClick={() => openModal("Рассчитать стоимость", "Оставьте заявку, и мы подготовим расчет для вашего проекта")}
          >
            Рассчитать
          </button>
        </div>

        {/* Right Section */}
        <div className="header-right">
          <button 
            className="btn-header-cta desktop-only"
            onClick={() => openModal("Рассчитать стоимость", "Оставьте заявку, и мы подготовим расчет для вашего проекта")}
          >
            Рассчитать стоимость
          </button>
          
          <div className="header-mobile-row mobile-only">
             <button 
               className="header-burger" 
               onClick={() => setIsMenuOpen(!isMenuOpen)}
             >
               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`header-menu-overlay ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="header-menu-content">
          <div className="header-menu-header mobile-only">
             <span className="menu-title">Меню</span>
             <button onClick={() => setIsMenuOpen(false)} className="close-btn"><X size={24}/></button>
          </div>
          <nav className="header-nav-mobile">
            {navLinks.map((link) => (
              link.path ? (
                <button 
                  key={link.name} 
                  onClick={() => handleNavClick(link)} 
                  className="header-nav-link-mobile-btn"
                >
                  {link.name}
                </button>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="header-nav-link-mobile"
                >
                  {link.name}
                </a>
              )
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
