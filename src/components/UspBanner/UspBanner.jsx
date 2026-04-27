import React from 'react';
import './UspBanner.css';
import { PencilRuler, Maximize, Factory, Wrench } from 'lucide-react';
import { useLang } from '../../i18n/context';

const icons = [<PencilRuler size={28} />, <Maximize size={28} />, <Factory size={28} />, <Wrench size={28} />];

const UspBanner = () => {
  const { t } = useLang();

  return (
    <section className="usp-banner">
      <div className="container">
        <div className="usp-grid">
          {t.usp.items.map((usp, idx) => (
            <div className="usp-card" key={idx}>
              <div className="usp-icon-wrap">{icons[idx]}</div>
              <div className="usp-content">
                <h3 className="usp-title">{usp.title}</h3>
                <p className="usp-text">{usp.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UspBanner;
