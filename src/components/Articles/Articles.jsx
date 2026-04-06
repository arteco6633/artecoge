import React from 'react';
import './Articles.css';
import { useNavigate } from 'react-router-dom';
import { articlesData } from '../../data/articlesData';

const seoDesc1 = "Для дизайнера интерьера этот стиль — возможность создать в проекте «якорь», объект-скульптуру, где массивное основание из грубо обработанного дерева встречается с безупречной геометрией тонкого шпона.";
const seoDesc2 = "Для дизайнера интерьера Heritage Modern — это идеальный инструмент для создания вневременных пространств, где современное искусство гармонично соседствует с мебелью, имеющей «генетический код» классики.";

const Articles = () => {
  const navigate = useNavigate();
  const summaryArticles = articlesData.slice(0, 3);

  return (
    <section className="articles" id="articles">
      <div className="container relative-container">
        <div className="articles-top">
          <h2 className="articles-main-title">Экспертные статьи</h2>
          <button className="view-all-btn" onClick={() => navigate('/articles')}>Все статьи</button>
        </div>
        
        <div className="articles-slider-wrapper">
          <div className="articles-grid">
            {summaryArticles.map(a => (
              <div key={a.id} className="article-expanded-card" onClick={() => navigate(`/article/${a.slug}`)}>
                <div className="article-img" style={{backgroundImage: `url(${a.img})`}}></div>
                <div className="article-info">
                  <h3 className="article-title">{a.title}</h3>
                  <p className="article-excerpt">{a.excerpt}</p>
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
