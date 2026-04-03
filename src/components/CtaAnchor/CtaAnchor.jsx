import React from 'react';
import './CtaAnchor.css';
import bgImage from '../../assets/catalog_storage.png'; 

const CtaAnchor = () => {
  return (
    <section className="cta-anchor-section" id="contact">
      <div className="container">
        <div 
          className="cta-bg-block" 
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="cta-overlay"></div>
          
          <div className="cta-content">
            <span className="cta-label">/Готовы обсудить ваш проект?</span>
            <h2 className="cta-title">
              Мы честно скажем, подходим ли мы<br/>
              вам — ещё до начала работы.
            </h2>
            <button className="cta-btn-white">Консультация со специалистом</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaAnchor;
