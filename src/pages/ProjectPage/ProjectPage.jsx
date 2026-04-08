import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../ModalContext';
import { supabase } from '../../supabaseClient';
import './ProjectPage.css';

const SECTION_METADATA = {
  kitchens: {
    ctaTitle: "Проект кухни",
    ctaDesc: "Спроектируем функциональное пространство под вас."
  },
  wardrobes: {
    ctaTitle: "Проект шкафа",
    ctaDesc: "Создадим идеальную систему хранения вещей."
  },
  cabinet: {
    ctaTitle: "Мебель в кабинет",
    ctaDesc: "Индивидуальный дизайн для рабочей атмосферы."
  },
  shelves: {
    ctaTitle: "Проект стеллажа",
    ctaDesc: "Спроектируем стеллаж под ваше пространство и задачи."
  },
  panels: {
    ctaTitle: "Стеновые панели",
    ctaDesc: "Подберём материал и рисунок под ваш интерьер."
  },
  bathrooms: {
    ctaTitle: "Мебель для санузла",
    ctaDesc: "Функциональные решения для ванной комнаты."
  }
};

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [otherProjects, setOtherProjects] = useState([]);

  useEffect(() => {
    fetchProject();
    window.scrollTo(0, 0);
  }, [projectId]);

  const fetchProject = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', projectId)
      .single();

    if (data) {
      setProject(data);
      fetchOtherProjects(data.slug, data.type || 'portfolio', data.category);
    } else {
      console.error("Project not found:", error);
    }
    setLoading(false);
  };

  const fetchOtherProjects = async (currentSlug, type, category) => {
    let query = supabase
      .from('projects')
      .select('*')
      .neq('slug', currentSlug)
      .eq('type', type);
    
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.limit(2);
    
    if (error) {
      console.error("Error fetching other projects:", error);
    } else {
      setOtherProjects(data || []);
    }
  };

  const openLightbox = (idx) => {
    setActiveImageIdx(idx);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    if (!project?.images) return;
    setActiveImageIdx((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    if (!project?.images) return;
    setActiveImageIdx((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  if (loading) return <div className="admin-loading" style={{padding: '200px 0', textAlign:'center', color: '#fff'}}>Загрузка проекта...</div>;
  if (!project) return <div style={{padding: '200px 0', textAlign:'center', color: '#fff'}}>Проект не найден. <button onClick={() => navigate('/')}>На главную</button></div>;

  return (
    <div className="project-page">
      <div className="container">
        <button className="pp-back-btn" onClick={() => navigate(-1)}>
          ← Назад в каталог
        </button>

        <div className="pp-content-layout">
          <div className="pp-header">
            <h1 className="pp-title">{project.name}</h1>
            <div className="pp-intro-block">
              <p className="pp-desc">{project.desc}</p>
              {project.details && project.details.length > 0 && (
                <div className="pp-details">
                  {project.details.map((item, idx) => (
                    <div key={idx} className="pp-detail-item">
                      <span className="pp-detail-label">{item.label}</span>
                      <span className="pp-detail-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {project.images && project.images.length > 0 && (
            <div className="pp-gallery-section">
              <div className="pp-gallery-grid">
                {project.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`pp-gallery-item ${idx === 0 ? 'featured' : ''}`}
                    onClick={() => openLightbox(idx)}
                  >
                    <img src={img} alt={`${project.name} photo ${idx + 1}`} />
                    <div className="pp-gallery-overlay">
                      <div className="pp-zoom-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pp-main-cta-wrapper">
                <div className="cp-cta-block">
                  <div className="cp-cta-text" style={{ textAlign: 'left' }}>
                    <span className="cp-cta-label">Хотите похожее?</span>
                    <h3 className="cp-cta-title">
                      {SECTION_METADATA[project.category]?.ctaTitle || "Индивидуальный проект"}
                    </h3>
                    <p className="cp-cta-desc">
                      {SECTION_METADATA[project.category]?.ctaDesc || "Спроектируем мебель под ваше пространство и бюджет."}
                    </p>
                  </div>
                  <button 
                    className="btn-orange-pill" 
                    onClick={() => openModal("Рассчитать стоимость", project.name)}
                  >
                    Рассчитать стоимость
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {isLightboxOpen && project.images && (
          <div className="pp-lightbox" onClick={closeLightbox}>
            <button className="pp-lightbox-close">✕</button>
            <button className="pp-lightbox-nav prev" onClick={prevImage}>‹</button>
            <div className="pp-lightbox-content">
              <img src={project.images[activeImageIdx]} alt="Lightbox" />
              <div className="pp-lightbox-counter">
                {activeImageIdx + 1} / {project.images.length}
              </div>
            </div>
            <button className="pp-lightbox-nav next" onClick={nextImage}>›</button>
          </div>
        )}

        {otherProjects.length > 0 && (
          <div className="pp-other-projects">
            <h2 className="pp-other-title">Смотрите также</h2>
            <div className="pp-other-grid">
              {otherProjects.map((other) => (
                <div 
                  key={other.id} 
                  className="pp-other-card" 
                  onClick={() => navigate(other.type === 'catalog' ? `/catalog/${other.slug}` : `/project/${other.slug}`)}
                >
                  <div className="pp-other-img" style={{ backgroundImage: `url(${other.images[0]})` }}></div>
                  <div className="pp-other-info">
                    <h3 className="pp-other-name">{other.name}</h3>
                    <span className="pp-other-link">Перейти →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pp-cta" style={{ backgroundImage: `url(${project.images[0]})` }}>
          <h2 className="pp-cta-title">Понравился проект?</h2>
          <p className="pp-cta-desc">Оставьте заявку, и мы адаптируем подобное решение под ваши размеры и бюджет.</p>
          <button 
            className="btn-orange-pill" 
            onClick={() => openModal("Обсудить проект", project.name)}
          >
            Обсудить мой проект
          </button>
        </div>
      </div>
    </div>
  );
};


export default ProjectPage;
