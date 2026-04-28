import React from 'react';
import './CompanyInfo.css';
import teamSalavat from '../../assets/team_salavat.jpg';
import teamAnastasia from '../../assets/team_anastasia.jpg';
import productionStart from '../../assets/production_start.png';
import { useLang } from '../../i18n/context';

const CompanyInfo = () => {
  const { t } = useLang();
  const c = t.company;
  const teamPhotos = [teamAnastasia, teamSalavat];

  return (
    <section className="company-info" id="about">
      <div className="container">
        <div className="company-white-block">
          <div className="company-header-split">
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

          <div className="company-team-grid">
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

          <div className="company-timeline-section">
            <h3 className="company-timeline-title">{c.timelineTitle}</h3>
            <div className="timeline-grid">
              {c.timeline && c.timeline.map((step, idx) => (
                <div key={idx} className={`timeline-card ${step.hasMap ? 'timeline-card-map' : ''}`}>
                  <span className="timeline-num">{step.num}</span>
                  <div className="timeline-content">
                    <h4 className="timeline-card-title">{step.title}</h4>
                    <p className="timeline-desc">{step.desc}</p>
                    
                    {step.hasImage && (
                      <div className="timeline-image-container">
                        <img src={productionStart} alt="Производство мебели" className="timeline-step-img" />
                      </div>
                    )}

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
                    <div className="timeline-socials">
                      {step.hasInsta && (
                        <a href={step.instaLink} target="_blank" rel="noopener noreferrer" className="timeline-social-preview insta">
                          <div className="social-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                          </div>
                          <div className="social-info">
                             <span className="social-title">Instagram</span>
                             <span className="social-handle">{step.instaHandle}</span>
                          </div>
                          <div className="social-arrow">→</div>
                        </a>
                      )}
                      {step.hasTG && (
                        <a href={step.tgLink} target="_blank" rel="noopener noreferrer" className="timeline-social-preview tg">
                          <div className="social-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.891 7.007l-2.012 9.492c-.151.677-.552.844-1.121.523l-3.072-2.261-1.482 1.428c-.163.163-.301.3-.617.3l.221-3.131 5.698-5.148c.248-.221-.054-.344-.383-.125l-7.042 4.434-3.037-.95c-.661-.206-.673-.661.138-.976l11.868-4.573c.549-.206 1.028.125.84 1.288z"/></svg>
                          </div>
                          <div className="social-info">
                             <span className="social-title">Telegram</span>
                             <span className="social-handle">{step.tgHandle}</span>
                          </div>
                          <div className="social-arrow">→</div>
                        </a>
                      )}
                      {step.hasWeb && (
                        <a href={step.webLink} target="_blank" rel="noopener noreferrer" className="timeline-social-preview web">
                          <div className="social-icon">
                            <img src={`https://www.google.com/s2/favicons?sz=128&domain=${new URL(step.webLink).hostname}`} alt={step.webTitle} />
                          </div>
                          <div className="social-info">
                             <span className="social-title">Веб-сайт</span>
                             <span className="social-handle">{step.webTitle}</span>
                          </div>
                          <div className="social-arrow">→</div>
                        </a>
                      )}
                      {step.hasWeb2 && (
                        <a href={step.webLink2} target="_blank" rel="noopener noreferrer" className="timeline-social-preview web">
                          <div className="social-icon">
                            <img src={`https://www.google.com/s2/favicons?sz=128&domain=${new URL(step.webLink2).hostname}`} alt={step.webTitle2} />
                          </div>
                          <div className="social-info">
                             <span className="social-title">Веб-сайт</span>
                             <span className="social-handle">{step.webTitle2}</span>
                          </div>
                          <div className="social-arrow">→</div>
                        </a>
                      )}
                      {step.hasWeb3 && (
                        <a href={step.webLink3} target="_blank" rel="noopener noreferrer" className="timeline-social-preview web">
                          <div className="social-icon">
                            <img src={`https://www.google.com/s2/favicons?sz=128&domain=${new URL(step.webLink3).hostname}`} alt={step.webTitle3} />
                          </div>
                          <div className="social-info">
                             <span className="social-title">Веб-сайт</span>
                             <span className="social-handle">{step.webTitle3}</span>
                          </div>
                          <div className="social-arrow">→</div>
                        </a>
                      )}
                    </div>
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
