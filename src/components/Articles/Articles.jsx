import React from 'react';
import './Articles.css';
import a1 from '../../assets/hero_background.png';
import a2 from '../../assets/catalog_kitchen.png';
import a3 from '../../assets/catalog_storage.png';

const seoDesc1 = "Для дизайнера интерьера этот стиль — возможность создать в проекте «якорь», объект-скульптуру, где массивное основание из грубо обработанного дерева встречается с безупречной геометрией тонкого шпона.";
const seoDesc2 = "Для дизайнера интерьера Heritage Modern — это идеальный инструмент для создания вневременных пространств, где современное искусство гармонично соседствует с мебелью, имеющей «генетический код» классики.";

const articles = [
  { id: 1, title: 'Organic Brutalism: Грубый массив и изящный шпон в архитектуре мебели', desc: seoDesc1, img: a2, date: '14.03.2026' },
  { id: 2, title: 'Heritage Modern: Антикварные силуэты и современные технологии в массиве дерева', desc: seoDesc2, img: a1, date: '14.03.2026' },
  { id: 3, title: 'Heritage Modern: Антикварные силуэты и современные технологии в массиве дерева', desc: seoDesc2, img: a3, date: '14.03.2026' }
];

const Articles = () => {
  return (
    <section className="articles" id="articles">
      <div className="container relative-container">
        <h2 className="articles-main-title">Статьи</h2>
        
        <div className="articles-slider-wrapper">
          <div className="articles-grid">
            {articles.map(a => (
              <div key={a.id} className="article-expanded-card">
                <div className="article-img" style={{backgroundImage: `url(${a.img})`}}></div>
                <div className="article-info">
                  <h3 className="article-title">{a.title}</h3>
                  <p className="article-excerpt">{a.desc}</p>
                  <span className="article-date">{a.date}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="articles-next-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Articles;
