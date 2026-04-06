import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';
import p1 from '../../assets/projects/archi/8.jpg';
import alphaMain from '../../assets/projects/alpha/main.jpg';
import p2 from '../../assets/hero_background.png';
import p3 from '../../assets/catalog_storage.png';
import tbilisiMain from '../../assets/projects/tbilisi-gardens/main.jpg';

const projectsData = [
  { id: '1', slug: 'archi-lilac', image: p1, title: 'ЖК Archi Lilac: Эстетика в деталях' },
  { id: '2', slug: 'alpha-home', image: alphaMain, title: 'Alpha Home: Минимализм и гармония' },
  { id: '3', slug: 'tbilisi-gardens', image: tbilisiMain, title: 'Tbilisi Gardens: Премиум-класс в центре' },
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
              onClick={() => navigate(`/project/${proj.slug}`)}
            >
              <div className="project-card-inner">
                <img src={proj.image} alt={proj.title} className="project-card-img" />
                <div className="project-card-overlay">
                  <h3 className="pc-title">{proj.title}</h3>
                  <div className="pc-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
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

export default Projects;
