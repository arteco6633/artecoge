import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CatalogPage.css';
import Hero from '../../components/Hero/Hero';
import catalogHero from '../../assets/catalog_hero.png';
import ImageLightbox from '../../components/ImageLightbox/ImageLightbox';
import { useModal } from '../../ModalContext';
import { supabase } from '../../supabaseClient';

const SECTION_METADATA = {
  kitchens: {
    title: "КУХНИ",
    ctaTitle: "Проект кухни",
    ctaDesc: "Спроектируем функциональное пространство под вас."
  },
  wardrobes: {
    title: "ШКАФЫ",
    ctaTitle: "Проект шкафа",
    ctaDesc: "Создадим идеальную систему хранения вещей."
  },
  cabinet: {
    title: "КАБИНЕТЫ",
    ctaTitle: "Мебель в кабинет",
    ctaDesc: "Индивидуальный дизайн для рабочей атмосферы."
  },
  shelves: {
    title: "СТЕЛЛАЖИ",
    ctaTitle: "Проект стеллажа",
    ctaDesc: "Спроектируем стеллаж под ваше пространство и задачи."
  },
  panels: {
    title: "СТЕНОВЫЕ ПАНЕЛИ",
    ctaTitle: "Стеновые панели",
    ctaDesc: "Подберём материал и рисунок под ваш интерьер."
  },
  bathrooms: {
    title: "САНУЗЛЫ",
    ctaTitle: "Мебель для санузла",
    ctaDesc: "Функциональные решения для ванной комнаты."
  }
};

const CatalogPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [lightboxData, setLightboxData] = useState(null); // { images, index }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();

    const handleScroll = () => {
      // Threshold depends on Hero height. 400px is safe for compact hero.
      setIsSticky(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (images, index = 0) => {
    setLightboxData({ images, index });
  };

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('type', 'catalog')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
    } else {
      // Group projects by category
      const grouped = data.reduce((acc, project) => {
        const cat = project.category || 'kitchens';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(project);
        return acc;
      }, {});

      // Build sections array based on SECTION_METADATA keys to preserve order
      const finalSections = Object.keys(SECTION_METADATA).map(key => ({
        id: key,
        ...SECTION_METADATA[key],
        projects: grouped[key] || []
      })).filter(s => s.projects.length > 0);

      setSections(finalSections);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="loading-state">Загрузка каталога...</div>;
  }

  return (
    <div className="catalog-page-container">
      <Hero
        title={<>КАТАЛОГ ИНДИВИДУАЛЬНЫХ<br />МЕБЕЛЬНЫХ РЕШЕНИЙ</>}
        subtitle=""
        rightText="Мы не продаём готовые изделия. Каждое решение проектируется под конкретные задачи, пространство и сценарии использования."
        showSlider={false}
        compact={true}
        bgImage={catalogHero}
      />

      {/* Navigation */}
      <div className={`cp-sticky-nav ${isSticky ? 'is-sticky' : ''}`}>
        <div className="container cp-nav-inner">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="cp-nav-link">{s.title}</a>
          ))}
        </div>
      </div>


      {sections.map((section, idx) => (
        <section key={section.id} id={section.id} className="cp-section">
          <div className="container">
            <h2 className="cp-section-title">{section.title}</h2>

            <div className="cp-projects-list">
              {section.projects.map((project, pIdx) => (
                <div key={pIdx} className="cp-project">
                  <div className="cp-project-header">
                    <div className="cp-project-title-area">
                      <h3 className="cp-project-name">
                        {project.name} <span className="cp-project-category-suffix">по индивидуальному проекту</span>
                      </h3>
                    </div>
                    <p className="cp-project-description-top">
                      {project.desc?.substring(0, 160) || "Акцент на дизайне, который расширяет пространство и выглядит дорого. Кухня как арт-объект. Масштабные решения для любого пространства."}
                    </p>
                  </div>

                  <div className="cp-project-image-grid">
                    {(project.images || project.image_urls || []).slice(0, 4).map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={project.name}
                        className="cp-grid-img"
                        onClick={() => openLightbox(project.images || project.image_urls, i)}
                        style={{ cursor: 'zoom-in' }}
                      />
                    ))}
                  </div>

                  <div className="cp-project-footer">
                    <div className="cp-result-box">
                      <div className="cp-result-header">
                        <h4 className="cp-result-title">Результат</h4>
                        <Link to={`/project/${project.id || project.slug}`} className="cp-details-link">
                          Подробнее ↗
                        </Link>
                      </div>
                      <p className="cp-result-text">
                        {project.result || "Результат — мебель, которая выглядит дорого, работает безупречно и остаётся актуальной долгие годы."}
                      </p>
                    </div>

                    <div className="cp-actions-area">
                      <button
                        className="cp-view-all-link"
                        onClick={() => openLightbox(project.images || project.image_urls, 0)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                      >
                        Смотреть все фото →
                      </button>
                      <button
                        className="btn-orange-pill"
                        onClick={() => openModal(section.ctaTitle, section.ctaDesc)}
                      >
                        Рассчитать стоимость
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cp-section-cta">
              <div className="cp-cta-block">
                <div className="cp-cta-text">
                  <span className="cp-cta-label">Хотите похожее?</span>
                  <h3 className="cp-cta-title">{section.ctaTitle}</h3>
                  <p className="cp-cta-desc">{section.ctaDesc}</p>
                </div>
                <button
                  className="btn-orange-pill"
                  onClick={() => openModal(section.ctaTitle, section.ctaDesc)}
                >
                  Индивидуальный подбор
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {sections.length === 0 && (
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <p style={{ color: '#666' }}>Добавьте проекты в каталог через админ-панель.</p>
        </div>
      )}
      {lightboxData && (
        <ImageLightbox
          images={lightboxData.images}
          initialIndex={lightboxData.index}
          onClose={() => setLightboxData(null)}
        />
      )}
    </div>
  );
};

export default CatalogPage;
