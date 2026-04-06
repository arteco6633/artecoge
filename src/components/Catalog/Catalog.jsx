import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Catalog.css';
import kitchenBg from '../../assets/catalog_kitchen.png';
import storageBg from '../../assets/catalog_storage.png';
import heroBg from '../../assets/hero_background.png';
import panelsBg from '../../assets/catalog_panels.png';
import receptionBg from '../../assets/catalog_reception.png';

const catalogItems = [
  {
    id: 1,
    title: 'Проектируем и изготавливаем кухни и мебель для сложных зон с акцентом на технологичность, влагостойкость и долговечность. Используем массив, шпон, шпанированную фанеру и MDF строго по назначению, применяя проверенные конструктивные решения и фурнитуру Blum. Результат — мебель, которая выглядит дорого и безупречно работает долгие годы.',
    shortTitle: 'Кухни и мебель для зон с повышенной нагрузкой',
    bullets: ['Кухни', 'Мебель для санузлов', 'Тумбы', 'Раковины'],
    image: kitchenBg,
  },
  {
    id: 2,
    title: 'Разрабатываем шкафы, стеллажи и системы хранения любой сложности — от встроенных решений до конструкций сложной геометрии. Все изделия проектируются под конкретное пространство, с продуманной эргономикой, скрытыми креплениями и качественной фурнитурой, рассчитанной на интенсивную эксплуатацию.',
    shortTitle: 'Хранение и корпусная мебель',
    bullets: ['Шкафы', 'Стеллажи', 'Системы хранения'],
    image: storageBg,
  },
  {
    id: 3,
    title: 'Работаем со сложными архитектурными элементами, требующими точных расчётов и инженерного подхода. Декоративные панели, стеновые панели и фальшфасады проектируются с учётом нагрузок, геометрии и безопасности, а визуальный результат становится логичным продолжением конструкции.',
    shortTitle: 'Архитектурные и инженерные элементы',
    bullets: ['Декоративные панели', 'Фальшфасады', 'Стеновые панели'],
    image: panelsBg,
  },
  {
    id: 4,
    title: 'Изготавливаем мебель для ресторанов, офисов и общественных пространств, где важны статус, повторяемость и надёжность. Ресепшн зоны и специализированная мебель проектируются индивидуально или серийно, с учётом интенсивной эксплуатации и требований бизнеса.',
    shortTitle: 'Коммерческая мебель',
    bullets: ['Ресепшены', 'Мебель для HoReCa'],
    image: receptionBg,
  }
];

const Catalog = () => {
  const navigate = useNavigate();
  const [flippedId, setFlippedId] = useState(null);

  const handleCardClick = (id) => {
    if (flippedId === id) {
      navigate('/catalog');
    } else {
      setFlippedId(id);
    }
  };

  return (
    <section className="catalog" id="catalog">
      <div className="container">
        
        <div className="catalog-header">
          <div className="title-wrapper">
            <span className="small-label">/Каталог</span>
            <h2 className="catalog-main-title">
              Мы проектируем и изготавливаем<br/>
              мебель под конкретные задачи,<br/>
              <span className="text-gray">а не по шаблонам</span>
            </h2>
          </div>
          <p className="catalog-subtitle">
            Ниже — основные категории мебели, с которыми мы работаем на постоянной основе. Все изделия проектируются индивидуально, с учётом нагрузок, условий эксплуатации и архитектуры пространства.
          </p>
        </div>
        
        <div className="catalog-grid-1to1">
          {catalogItems.map((item) => (
            <div 
              key={item.id} 
              className="catalog-card-1to1 flip-card"
              onClick={() => handleCardClick(item.id)}
            >
              <div className={`flip-card-inner ${flippedId === item.id ? 'is-flipped' : ''}`}>
                {/* Front Side */}
                <div className="flip-card-front">
                  <div 
                    className="catalog-card-bg"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className="catalog-card-overlay"></div>
                  <div className="catalog-card-default">
                    <h3 className="card-top-title">{item.shortTitle}</h3>
                    <div className="card-bottom-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                        <path d="M16 21v-5h5"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back">
                  <div className="catalog-card-bg" style={{ backgroundImage: `url(${item.image})` }}></div>
                  <div className="catalog-card-overlay heavy"></div>
                  <div className="catalog-card-hidden">
                    <p className="hidden-desc">{item.title}</p>
                    <ul className="hidden-bullets">
                      {item.bullets.map((b, idx) => (
                        <li key={idx} onClick={(e) => e.stopPropagation()}>
                          <Link to="/catalog" style={{ color: 'inherit', textDecoration: 'none' }}>
                            • {b}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="hidden-footer">
                      <span className="hidden-link">
                        Смотреть категорию 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '12px', verticalAlign: 'middle', marginTop: '-2px'}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
