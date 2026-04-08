import React, { useState } from 'react';
import Catalog from '../Catalog/Catalog';
import Projects from '../Projects/Projects';
import './UnifiedPortfolio.css';

const UnifiedPortfolio = () => {
  return (
    <section className="unified-portfolio" id="portfolio">
      <div className="container">
        <div className="portfolio-header-top">
           <span className="small-label">/Наши работы и решения</span>
           <h2 className="portfolio-main-title">
             От концепции и категорий <span className="text-gray">до готовых объектов</span>
           </h2>
        </div>
      </div>
      
      <div className="portfolio-content">
        {/* Часть 1: Категории (Каталог) */}
        <Catalog isMinimal={true} />
        
        {/* Разделитель или подзаголовок между ними */}
        <div className="container" style={{ marginTop: '100px', marginBottom: '60px' }}>
            <h3 className="portfolio-divider-title">Реализованные проекты</h3>
            <p className="portfolio-divider-desc">Как наши решения оживают в интерьерах клиентов</p>
        </div>

        {/* Часть 2: Проекты */}
        <Projects isMinimal={true} />
      </div>
    </section>
  );
};

export default UnifiedPortfolio;
