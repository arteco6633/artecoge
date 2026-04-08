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
        
        {/* Часть 2: Проекты с восстановленным оригинальным заголовком */}
        <div className="projects" style={{ background: 'transparent', paddingTop: '100px' }}>
          <div className="container">
            <div className="projects-header">
              <span className="small-label">/Реализованные проекты</span>
              <div className="projects-header-grid">
                <h2 className="projects-title">
                  Проекты, которые доходят до конца <span className="text-gray">— без переделок, срывов сроков и потери качества</span>
                </h2>
                <p className="projects-desc">
                  Каждый из этих проектов — результат полного контроля всех этапов производства и установки. Здесь нет демонстрационных работ, только реальные объекты и реальные задачи.
                </p>
              </div>
            </div>
          </div>
          <Projects isMinimal={true} />
        </div>
      </div>
    </section>
  );
};

export default UnifiedPortfolio;
