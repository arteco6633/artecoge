import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Header.css';
import { useModal } from '../../ModalContext';
import { useLang } from '../../i18n/context';
import logoMobile from '../../assets/logo-mobile.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { openModal } = useModal();
  const navigate = useNavigate();
  const { lang, t, changeLang } = useLang();

  const navLinks = [
    { name: t.header.nav.catalog, path: '/catalog' },
    { name: t.header.nav.projects, path: '/#projects' },
    { name: t.header.nav.about, path: '/#about' },
    { name: t.header.nav.articles, path: '/articles' },
    { name: t.header.nav.contacts, path: '/#contacts' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isLangOpen) return;
    const handleClickOutside = () => setIsLangOpen(false);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [isLangOpen]);

  const handleNavClick = (e, link) => {
    setIsMenuOpen(false);
    if (link.path.includes('#')) {
      const [path, hash] = link.path.split('#');
      const targetPath = path === '/' ? '' : path;
      const currentPath = window.location.pathname === '/' ? '' : window.location.pathname;
      if (targetPath === currentPath) {
        const element = document.getElementById(hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, null, `#${hash}`);
        }
      }
    }
  };

  const languages = [
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ka', label: 'GE', flag: '🇬🇪' },
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Desktop Left: Full Logo */}
        <div className="header-left desktop-only">
          <a href="/" className="header-logo">ARTECO</a>
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
            <Link
              key={link.name}
              to={link.path}
              className="nav-link"
              onClick={(e) => handleNavClick(e, link)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Center: CTA Button */}
        <div className="header-center-mobile mobile-only">
          <button
            className="btn-header-cta-mobile"
            onClick={() => openModal(t.header.ctaModalTitle, t.header.ctaModalDesc)}
          >
            {t.header.ctaMobile}
          </button>
        </div>

        {/* Right Section */}
        <div className="header-right">
          {/* Language Switcher Dropdown */}
          <div className="lang-dropdown" onClick={(e) => e.stopPropagation()}>
            <button 
              className={`lang-trigger ${isLangOpen ? 'active' : ''}`}
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <span className="lang-flag">{currentLang.flag}</span>
              <span className="lang-label">{currentLang.label}</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`lang-arrow ${isLangOpen ? 'open' : ''}`}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className={`lang-list ${isLangOpen ? 'is-open' : ''}`}>
              {languages.map((l) => (
                <button
                  key={l.code}
                  className={`lang-item ${lang === l.code ? 'selected' : ''}`}
                  onClick={() => {
                    changeLang(l.code);
                    setIsLangOpen(false);
                  }}
                >
                  <span className="lang-flag">{l.flag}</span>
                  <span className="lang-label">{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn-header-cta desktop-only"
            onClick={() => openModal(t.header.ctaModalTitle, t.header.ctaModalDesc)}
          >
            {t.header.cta}
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
            <span className="menu-title">{t.header.menuTitle}</span>
            <button onClick={() => setIsMenuOpen(false)} className="close-btn"><X size={24} /></button>
          </div>
          <nav className="header-nav-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className="header-nav-link-mobile-btn"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Language Dropdown */}
          <div className="mobile-lang-section">
            <button 
              className={`mobile-lang-trigger ${isLangOpen ? 'active' : ''}`}
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <div className="trigger-left">
                <span className="lang-flag">{currentLang.flag}</span>
                <span className="lang-label">{currentLang.label}</span>
              </div>
              <svg width="12" height="8" viewBox="0 0 10 6" fill="none" className={`lang-arrow ${isLangOpen ? 'open' : ''}`}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={`mobile-lang-list ${isLangOpen ? 'is-open' : ''}`}>
              {languages.map((l) => (
                <button
                  key={l.code}
                  className={`mobile-lang-item ${lang === l.code ? 'selected' : ''}`}
                  onClick={() => {
                    changeLang(l.code);
                    setIsLangOpen(false);
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="lang-flag">{l.flag}</span>
                  <span className="lang-label">{l.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
