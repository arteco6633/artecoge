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
