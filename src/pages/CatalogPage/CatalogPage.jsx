import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CatalogPage.css';
import kitchenImg from '../../assets/catalog_kitchen.png';
import storageImg from '../../assets/catalog_storage.png';
import heroImg from '../../assets/hero_background.png';
import Hero from '../../components/Hero/Hero';
import { useModal } from '../../ModalContext';

const catalogSections = [
  {
    id: "kitchens",
    title: "КУХНИ",
    ctaTitle: "Проект кухни",
    ctaDesc: "Спроектируем функциональное пространство под вас.",
    projects: [
      { id: "alia-kitchen", name: "ЖК ALIA", images: [kitchenImg, heroImg, storageImg] },
      { id: "premium-park-kitchen", name: "ЖК PREMIUM PARK", images: [heroImg, kitchenImg, storageImg] },
    ]
  },
  {
    id: "wardrobes",
    title: "ШКАФЫ",
    ctaTitle: "Проект шкафа",
    ctaDesc: "Создадим идеальную систему хранения вещей.",
    projects: [
      { id: "skyline-wardrobe", name: "ЖК SKYLINE", images: [storageImg, kitchenImg, heroImg] },
      { id: "diamond-hill-wardrobe", name: "ЖК DIAMOND HILL", images: [kitchenImg, heroImg, storageImg] },
    ]
  },
  {
    id: "cabinet",
    title: "КАБИНЕТЫ",
    ctaTitle: "Мебель в кабинет",
    ctaDesc: "Индивидуальный дизайн для рабочей атмосферы.",
    projects: [
      { id: "vake-cabinet", name: "РЕЗИДЕНЦИЯ VAKE", images: [heroImg, storageImg, kitchenImg] },
    ]
  },
  {
    id: "shelves",
    title: "СТЕЛЛАЖИ",
    ctaTitle: "Проект стеллажа",
    ctaDesc: "Спроектируем стеллаж под ваше пространство и задачи.",
    projects: [
      { id: "axis-shelves", name: "ЖК AXIS", images: [storageImg, heroImg, kitchenImg] },
      { id: "digomi-shelves", name: "ЧАСТНЫЙ ДОМ DIGOMI", images: [kitchenImg, storageImg, heroImg] },
    ]
  },
  {
    id: "panels",
    title: "СТЕНОВЫЕ ПАНЕЛИ",
    ctaTitle: "Стеновые панели",
    ctaDesc: "Подберём материал и рисунок под ваш интерьер.",
    projects: [
      { id: "boulevard-panels", name: "ЖК BOULEVARD", images: [kitchenImg, storageImg, heroImg] },
    ]
  },
  {
    id: "bathrooms",
    title: "САНУЗЛЫ",
    ctaTitle: "Мебель для санузла",
    ctaDesc: "Функциональные решения для ванной комнаты.",
    projects: [
      { id: "alia-bathroom", name: "ЖК ALIA", images: [heroImg, kitchenImg, storageImg] },
      { id: "skyline-bathroom", name: "ЖК SKYLINE", images: [storageImg, heroImg, kitchenImg] },
    ]
  }
];

const CatalogPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="catalog-page-container">
      <Hero 
        title={<>КАТАЛОГ ИНДИВИДУАЛЬНЫХ<br />МЕБЕЛЬНЫХ РЕШЕНИЙ</>}
        subtitle=""
        rightText="Мы не продаём готовые изделия. Каждое решение проектируется под конкретные задачи, пространство и сценарии использования."
        showSlider={false}
        compact={true}
      />

      {/* Navigation */}
      <div className="cp-sticky-nav">
        <div className="container cp-nav-inner">
          {catalogSections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="cp-nav-link">{s.title}</a>
          ))}
        </div>
      </div>

      {catalogSections.map((section, idx) => (
        <section key={section.id} id={section.id} className={`cp-section ${idx % 2 !== 0 ? 'bg-light' : ''}`}>
          <div className="container">
            <h2 className="cp-section-title">{section.title}</h2>

            {section.projects.map((project, pIdx) => (
              <div key={pIdx} className="cp-project">
                <div className="cp-project-grid">
                  {project.images.map((img, i) => (
                    <div 
                      key={i} 
                      className={`cp-project-img ${i === 0 ? 'cp-project-img--large' : ''}`} 
                      style={{ backgroundImage: `url(${img})` }}
                    ></div>
                  ))}
                </div>
                <div className="cp-project-footer">
                  <h3 className="cp-project-name">{project.name}</h3>
                  <button 
                    className="cp-project-btn"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    Смотреть весь проект →
                  </button>
                </div>
              </div>
            ))}

            <div className="cp-cta-block">
              <div className="cp-cta-text">
                <span className="cp-cta-label">Хотите похожее?</span>
                <h3 className="cp-cta-title">{section.ctaTitle}</h3>
                <p className="cp-cta-desc">{section.ctaDesc}</p>
              </div>
              <button 
                className="btn-primary" 
                onClick={() => openModal("Рассчитать стоимость", section.ctaTitle)}
              >
                Рассчитать стоимость
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default CatalogPage;
