import React from 'react';
import './CompanyInfo.css';
import teamSalavat from '../../assets/team_salavat.jpg';
import teamAnastasia from '../../assets/team_anastasia.jpg';
import { useLang } from '../../i18n/context';

const CompanyInfo = () => {
  const { t } = useLang();
  const c = t.company;
  const teamPhotos = [teamAnastasia, teamSalavat];

  return (
    <section className="company-info" id="about">
      <div className="container">
        <div className="company-white-block">
          <div className="glass-blob glass-blob-1"></div>
          <div className="glass-blob glass-blob-2"></div>
          
          <div className="company-header-split relative-z">
            <div className="header-split-left">
              <span className="small-label">{c.label}</span>
              <h2 className="company-title">
                {c.title1}<br/>
                <span className="text-gray">{c.titleGray}</span>
              </h2>
            </div>
            <div className="header-split-right">
              <p className="company-subtitle">
                {c.subtitle}
                <span style={{ textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '4px' }}>
                  {c.subtitleHighlight}
                </span>
              </p>
            </div>
          </div>

          <div className="company-team-grid relative-z">
            {c.roles && c.roles.map((role, idx) => (
              <div key={idx} className="role-card">
                <div className="role-header">
                  <div className="role-photo" style={{ backgroundImage: `url(${teamPhotos[idx]})` }}></div>
                  <div className="role-header-text">
                    <h4 className="role-name">{role.name}</h4>
                    <span className="role-title">{role.role}</span>
                  </div>
                </div>
                <p className="role-desc">{role.desc}</p>
              </div>
            ))}
          </div>

          <div className="company-timeline-section relative-z">
            <h3 className="company-timeline-title">{c.timelineTitle}</h3>
            <div className="timeline-grid">
              {c.timeline && c.timeline.map((step, idx) => (
                <div key={idx} className={`timeline-card ${step.hasMap ? 'timeline-card-map' : ''}`}>
                  <span className="timeline-num">{step.num}</span>
                  <div className="timeline-content">
                    <h4 className="timeline-card-title">{step.title}</h4>
                    <p className="timeline-desc">{step.desc}</p>
                    {step.hasMap && (
                      <div className="timeline-map-container">
                        <iframe 
                          src={step.mapLink} 
                          width="100%" 
                          height="200" 
                          frameBorder="0" 
                          allowFullScreen={true}
                          title="Yandex Map"
                        ></iframe>
                      </div>
                    )}
                    {step.hasInsta && (
                      <a href={step.instaLink} target="_blank" rel="noopener noreferrer" className="timeline-insta-preview">
                        <div className="insta-icon">
                          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        </div>
                        <div className="insta-info">
                           <span className="insta-title">Профиль Instagram</span>
                           <span className="insta-handle">{step.instaHandle}</span>
                        </div>
                        <div className="insta-arrow">→</div>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
