import React from 'react';
import './UspBanner.css';
import { Warehouse, Users, Wrench, Clock } from 'lucide-react';

const usps = [
  {
    id: 1,
    icon: <Warehouse size={28} />,
    title: "Внутри компании",
    text: "Все этапы — внутри компании, без перекладывания ответственности"
  },
  {
    id: 2,
    icon: <Users size={28} />,
    title: "Ручное управление",
    text: "Минимальные подрядчики и ручное управление процессом"
  },
  {
    id: 3,
    icon: <Wrench size={28} />,
    title: "Собственная установка",
    text: "Собственная установка — без потерь качества на конечном этапе"
  },
  {
    id: 4,
    icon: <Clock size={28} />,
    title: "Контроль сроков",
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
