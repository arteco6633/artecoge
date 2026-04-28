import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useModal } from '../../ModalContext';
import './Partners.css';
import placeholderImage1 from '../../assets/catalog_kitchen.png';
import placeholderImage2 from '../../assets/catalog_storage.png';
import { useLang } from '../../i18n/context';

const Partners = () => {
  const [activeTabId, setActiveTabId] = useState('private');
  const { openModal } = useModal();
  const { t } = useLang();

  const tabsData = t.partners.tabs;
  const activeData = tabsData.find(tab => tab.id === activeTabId);
  const images = [placeholderImage1, placeholderImage2];

  const handleNextTab = () => {
    const currentIndex = tabsData.findIndex(t => t.id === activeTabId);
    const nextIndex = (currentIndex + 1) % tabsData.length;
    setActiveTabId(tabsData[nextIndex].id);
  };

  const handlePrevTab = () => {
    const currentIndex = tabsData.findIndex(t => t.id === activeTabId);
    const prevIndex = (currentIndex - 1 + tabsData.length) % tabsData.length;
    setActiveTabId(tabsData[prevIndex].id);
  };


  return (
    <section className="partners-section" id="partners">
      <div className="container">
        <div className="partners-grid-layout">
          
          {/* Left Column */}
          <div className="partners-left">
            <div className="partners-tabs-wrap">
              <div className="partners-tabs">
                {tabsData.map(tab => (
                  <button 
                    key={tab.id}
                    className={`partner-tab-btn ${activeTabId === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTabId(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            <p className="partners-intro-text">
              {t.partners.introText}
            </p>

            <div className="partners-bottom-content">
              <div key={activeTabId}>
                  <div className="partners-title-block">
                    <span className="small-label-partners">{activeData.subtitle}</span>
                    <h2 className="partners-main-title">
                      {activeData.titleMain}{' '}
                      <span className="text-gray">{activeData.titleGray}</span>
                    </h2>
                  </div>
              </div>
              
              <div className="partners-cta-wrap">
                <Link to="/catalog" className="btn-primary-orange">
                  {t.partners.goToCatalog}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '8px', marginBottom: '-2px'}}>
                    <line x1="7" y1="7" x2="17" y2="17"></line>
                    <polyline points="17 7 17 17 7 17"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
            <div 
              key={activeTabId}
              className="partners-right-custom"
            >
              
              {/* Tall Card (Index 0) */}
              <div 
                className="partner-card card-tall" 
                style={{ backgroundImage: `url(${images[0]})` }}
              >
                <div className="partner-card-overlay"></div>
                <div className="partner-card-content">
                  <div className="pc-top-area">
                    {activeData.cards[0].title && <h3 className="pc-title">{activeData.cards[0].title}</h3>}
                    <p className={`pc-text ${!activeData.cards[0].title ? 'pc-text-large' : ''}`}>{activeData.cards[0].text}</p>
                    
                    {activeData.cards[0].buttonLabel && activeData.cards[0].isLink && (
                      <button 
                        className="pc-link"
                        onClick={() => openModal(activeData.cards[0].buttonLabel, activeData.label)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        {activeData.cards[0].buttonLabel} 
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginLeft: '8px' }}>
                          <circle cx="12" cy="12" r="10" fill="white"></circle>
                          <polyline points="12 16 16 12 12 8" stroke="#121212" strokeWidth="2" fill="none"></polyline>
                          <line x1="8" y1="12" x2="16" y2="12" stroke="#121212" strokeWidth="2"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {activeData.cards[0].buttonLabel && !activeData.cards[0].isLink && (
                    <div className="pc-bottom-area">
                      <button 
                        className="pc-btn-white"
                        onClick={() => openModal(activeData.cards[0].buttonLabel, activeData.label)}
                      >
                        {activeData.cards[0].buttonLabel}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column with Short Card and Arrows */}
              <div className="partner-card-col-right">
                <div 
                  className="partner-card card-short" 
                  style={{ backgroundImage: `url(${images[1]})` }}
                >
                  <div className="partner-card-overlay right-overlay"></div>
                  <div className="partner-card-content">
                    <div className="pc-top-area">
                      {activeData.cards[1].title && <h3 className="pc-title">{activeData.cards[1].title}</h3>}
                      <p className={`pc-text ${!activeData.cards[1].title ? 'pc-text-large' : ''}`}>{activeData.cards[1].text}</p>
                      
                      {activeData.cards[1].buttonLabel && activeData.cards[1].isLink && (
                        <button 
                          className="pc-link"
                          onClick={() => openModal(activeData.cards[1].buttonLabel, activeData.label)}
                          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}
                        >
                          {activeData.cards[1].buttonLabel} 
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginLeft: '8px' }}>
                            <circle cx="12" cy="12" r="10" fill="white"></circle>
                            <polyline points="12 16 16 12 12 8" stroke="#121212" strokeWidth="2" fill="none"></polyline>
                            <line x1="8" y1="12" x2="16" y2="12" stroke="#121212" strokeWidth="2"></line>
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    {activeData.cards[1].buttonLabel && !activeData.cards[1].isLink && (
                      <div className="pc-bottom-area">
                        <button 
                          className="pc-btn-white"
                          onClick={() => openModal(activeData.cards[1].buttonLabel, activeData.label)}
                        >
                          {activeData.cards[1].buttonLabel}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Arrows */}
                <div className="partners-arrows">
                  <button className="part-arrow-btn dark-ar" onClick={handlePrevTab}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <button className="part-arrow-btn white-ar" onClick={handleNextTab}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>

            </div>
        </div>
      </div>
    </section>
  );
}

export default Partners;
