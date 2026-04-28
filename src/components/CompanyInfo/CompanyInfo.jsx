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
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
