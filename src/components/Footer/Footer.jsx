import React from 'react';
import './Footer.css';
import { useLang } from '../../i18n/context';

const Footer = () => {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className="footer" id="contacts">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <h2 className="footer-brand">ARTECO</h2>
            <p className="footer-desc">{f.desc}</p>
          </div>

          <div className="footer-grid">
            <div className="footer-col">
              <h4 className="footer-title">{f.navTitle}</h4>
              <nav className="footer-nav">
                <a href="#catalog">{f.catalog}</a>
                <a href="#about">{f.about}</a>
                <a href="#projects">{f.projects}</a>
                <a href="#faq">{f.faq}</a>
              </nav>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">{f.contactsTitle}</h4>
              <div className="footer-contact-info">
                <a href="https://wa.me/79651468409" target="_blank" rel="noopener noreferrer" className="contact-link">WhatsApp</a>
                <a href="https://t.me/arteco_sale" target="_blank" rel="noopener noreferrer" className="contact-link">Telegram</a>
                <a href="tel:+995591088478" className="contact-link">+995 591 088 478</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{f.rights}</p>
          <div className="footer-social">
            <a href="https://wa.me/79651468409" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://t.me/arteco_sale" target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
