import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Catalog.css';
import kitchenBg from '../../assets/catalog_kitchen.png';
import storageBg from '../../assets/catalog_storage.png';
import heroBg from '../../assets/hero_background.png';
import panelsBg from '../../assets/catalog_panels.png';
import receptionBg from '../../assets/catalog_reception.png';
import { useLang } from '../../i18n/context';

const images = [kitchenBg, storageBg, panelsBg, receptionBg];

const Catalog = ({ isMinimal = false }) => {
  const navigate = useNavigate();
  const [flippedId, setFlippedId] = useState(null);
  const { t } = useLang();
  const c = t.catalog;

  const handleCardClick = (id) => {
    if (flippedId === id) {
      navigate('/catalog');
    } else {
      setFlippedId(id);
    }
  };

  return (
    <section className="catalog" id="catalog">
      <div className="container">
        {!isMinimal && (
          <div className="catalog-header">
            <div className="title-wrapper">
              <span className="small-label">{c.label}</span>
              <h2 className="catalog-main-title desktop-only">
                {c.titleDesktop1}<br/>
                {c.titleDesktop2}<br/>
                <span className="text-gray">{c.titleDesktopGray}</span>
              </h2>
              <h2 className="catalog-main-title mobile-only">
                {c.titleMobilePrefix} <span className="highlight-orange-italic">{c.titleMobileHighlight}</span><br/>
                {c.titleMobileLine2}
              </h2>
            </div>
            <p className="catalog-subtitle">{c.subtitle}</p>
          </div>
        )}

        <div className="catalog-grid-1to1">
          {c.items.map((item, idx) => (
            <div
              key={idx}
              className="catalog-card-1to1 flip-card"
              onClick={() => handleCardClick(idx)}
            >
              <div className={`flip-card-inner ${flippedId === idx ? 'is-flipped' : ''}`}>
                {/* Front Side */}
                <div className="flip-card-front">
                  <div className="catalog-card-bg" style={{ backgroundImage: `url(${images[idx]})` }}></div>
                  <div className="catalog-card-overlay"></div>
                  <div className="catalog-card-default">
                    <h3 className="card-top-title">{item.shortTitle}</h3>
                    <div className="card-bottom-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                        <path d="M16 21v-5h5"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back">
                  <div className="catalog-card-bg" style={{ backgroundImage: `url(${images[idx]})` }}></div>
                  <div className="catalog-card-overlay heavy"></div>
                  <div className="catalog-card-hidden">
                    <p className="hidden-desc">{item.title}</p>
                    <ul className="hidden-bullets">
                      {item.bullets.map((b, i) => (
                        <li key={i} onClick={(e) => e.stopPropagation()}>
                          <Link to="/catalog" style={{ color: 'inherit', textDecoration: 'none' }}>• {b}</Link>
                        </li>
                      ))}
                    </ul>
                    <div className="hidden-footer">
                      <span className="hidden-link">
                        {c.goToCatalog}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '12px', verticalAlign: 'middle', marginTop: '-2px'}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
