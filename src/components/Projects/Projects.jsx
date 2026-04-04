import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';
import p1 from '../../assets/catalog_kitchen.png';
import p2 from '../../assets/hero_background.png';
import p3 from '../../assets/catalog_storage.png';

const projectsData = [
  { id: '1', slug: 'home-proj-1', image: p1, title: 'Уютная минималистичная кухня' },
  { id: '2', slug: 'home-proj-2', image: p2, title: 'Современный частный интерьер' },
  { id: '3', slug: 'home-proj-3', image: p3, title: 'Просторная гардеробная система' },
  { id: '4', slug: 'home-proj-4', image: p2, title: 'Офисное пространство' },
  { id: '5', slug: 'home-proj-5', image: p3, title: 'Коммерческая зона ресепшн' },
  { id: '6', slug: 'home-proj-6', image: p1, title: 'Премиальный мебельный сет' }
];

const Projects = () => {
  const navigate = useNavigate();

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="projects-header">
          <span className="small-label">/Реализованные проекты</span>
          <div className="projects-header-grid">
            <h2 className="projects-title">
              Проекты, которые доходят до конца <span className="text-gray">— без переделок, срывов сроков и потери качества</span>
            </h2>
            <p className="projects-desc">
              Каждый из этих проектов — результат полного контроля всех этапов производства и установки. Здесь нет демонстрационных работ, только реальные объекты и реальные задачи.
            </p>
          </div>
        </div>

        <div className="projects-grid">
          {projectsData.map(proj => (
            <div 
              className="project-card" 
              key={proj.id} 
              style={{backgroundImage: `url(${proj.image})`, cursor: 'pointer'}}
              onClick={() => navigate(`/project/${proj.slug}`)}
            >
              <div className="project-card-overlay">
                <span className="pc-caption-title">{proj.title}</span>
                <span className="pc-caption-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="5" x2="19" y2="19"></line>
                    <polyline points="19 9 19 19 9 19"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
