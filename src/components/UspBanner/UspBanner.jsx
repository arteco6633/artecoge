import React from 'react';
import './UspBanner.css';

const usps = [
  {
    id: 1,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="5" cy="12" r="3" fill="currentColor"/>
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
        <circle cx="19" cy="12" r="3" fill="currentColor"/>
      </svg>
    ),
    text: "Все этапы — внутри компании, без перекладывания ответственности"
  },
  {
    id: 2,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    text: "Минимум подрядчиков и ручное управление процессом"
  },
  {
    id: 3,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      </svg>
    ),
    text: "Собственная установка — без потери качества на финальном этапе"
  },
  {
    id: 4,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ),
    text: "Контроль сроков так же важен, как и качество мебели"
  }
];

const UspBanner = () => {
  return (
    <section className="usp-banner">
      <div className="container">
        <div className="usp-grid">
          {usps.map((usp) => (
            <div className="usp-card" key={usp.id}>
              <div className="usp-icon-wrap">
                {usp.icon}
              </div>
              <p className="usp-text">{usp.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UspBanner;
