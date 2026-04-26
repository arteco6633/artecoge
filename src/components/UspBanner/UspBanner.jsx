import React from 'react';
import './UspBanner.css';
import { Warehouse, Users, Wrench, Clock } from 'lucide-react';
import { useLang } from '../../i18n/context';

const icons = [<Warehouse size={28} />, <Users size={28} />, <Wrench size={28} />, <Clock size={28} />];

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
