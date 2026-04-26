import React from 'react';
import './CompanyInfo.css';
import aboutImage from '../../assets/catalog_kitchen.png';
import avatarImage from '../../assets/salavat_final.jpg';
import { useLang } from '../../i18n/context';

const CompanyInfo = () => {
  const { t } = useLang();
  const c = t.company;

  return (
    <section className="company-info" id="about">
      <div className="container">
        <div className="company-white-block">
          <div className="company-header-centered">
            <span className="small-label">{c.label}</span>
            <h2 className="company-title">
              {c.title1}<br/>
              <span className="text-gray">{c.titleGray}</span>
            </h2>
            <p className="company-subtitle">{c.subtitle}</p>
          </div>

          <div className="company-content-grid">
            <div className="company-image-card" style={{ backgroundImage: `url(${aboutImage})` }}></div>
            <div className="company-quote-card">
              <div className="quote-card-top">
                <div className="quote-subtitle">
                  <span className="quote-mark">{c.quoteStart}</span>
                  <p>{c.quotePart1}<br/>{c.quotePart2}</p>
                </div>
                <span className="quote-tag">{c.quoteTag}</span>
              </div>
              <p className="quote-main-text">
                {c.quoteMain1}<br/>
                {c.quoteMain2}<br/>
                {c.quoteMain3}
                <span className="quote-mark-end">{c.quoteEnd}</span>
              </p>
              <div className="quote-card-bottom">
                <div className="quote-author">
                  <span className="author-role">{c.authorRole}</span>
                  <h4 className="author-name">{c.authorName}</h4>
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
