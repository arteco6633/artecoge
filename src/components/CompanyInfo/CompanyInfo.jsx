import React from 'react';
import './CompanyInfo.css';
import aboutImage from '../../assets/catalog_kitchen.png'; // Example placeholder
import avatarImage from '../../assets/hero_background.png'; // Example placeholder

const CompanyInfo = () => {
  return (
    <section className="company-info" id="about">
      <div className="container">
        <div className="company-white-block">
          
          <div className="company-header-centered">
            <span className="small-label">/О компании</span>
            <h2 className="company-title">
              Мы не передаём ключевые этапы подрядчикам и не<br/>
              перекладываем ответственность <span className="text-gray">— весь путь от идеи до<br/>
              установленной мебели мы контролируем внутри компании</span>
            </h2>
          </div>

          <div className="company-content-grid">
            <div className="company-image-card" style={{ backgroundImage: `url(${aboutImage})` }}>
            </div>
            
            <div className="company-quote-card">
              <div className="quote-card-top">
                <div className="quote-subtitle">
                  <span className="quote-mark">“</span>
                  <p>В премиум-сегменте<br/>продаётся не материал.</p>
                </div>
                <span className="quote-tag">Принципы</span>
              </div>
              
              <p className="quote-main-text">
                Продаётся предсказуемость, контроль и<br/>
                ответственность за финальный результат.
                <span className="quote-mark-end">”</span>
              </p>
              
              <div className="quote-card-bottom">
                <div className="quote-author">
                  <span className="author-role">Генеральный директор</span>
                  <h4 className="author-name">Сулейманов Салават</h4>
                </div>
                <div className="author-avatar" style={{ backgroundImage: `url(${avatarImage})` }}></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
