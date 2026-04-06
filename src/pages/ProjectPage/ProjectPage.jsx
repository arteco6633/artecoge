import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../ModalContext';
import { supabase } from '../../supabaseClient';
import './ProjectPage.css';

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
    fetchOtherProjects();
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
    } else {
      console.error("Project not found:", error);
    }
    setLoading(false);
  };

  const fetchOtherProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .neq('slug', projectId)
      .limit(2);
    setOtherProjects(data || []);
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
            <div className="pp-info">
              <p className="pp-desc">{project.desc}</p>
              <div className="pp-details">
                {project.details && project.details.map((item, idx) => (
                  <div key={idx} className="pp-detail-item">
                    <span className="pp-detail-label">{item.label}</span>
                    <span className="pp-detail-value">{item.value}</span>
                  </div>
                ))}
                <button 
                  className="btn-primary" 
                  style={{marginTop:'20px', width:'100%'}}
                  onClick={() => openModal("Обсудить проект", project.name)}
                >
                  Обсудить мой проект
                </button>
              </div>
            </div>
          </div>

          {project.images && project.images.length > 0 && (
            <div className="pp-slider-section">
              <div className="pp-slider-container">
                <div className="pp-slider-track" style={{ transform: `translateX(-${activeImageIdx * 100}%)` }}>
                  {project.images.map((img, idx) => (
                    <div key={idx} className="pp-slide" onClick={() => openLightbox(idx)}>
                      <img src={img} alt={`${project.name} photo ${idx + 1}`} />
                    </div>
                  ))}
                </div>
                {project.images.length > 1 && (
                    <>
                        <button className="pp-slider-arrow prev" onClick={(e) => { e.stopPropagation(); prevImage(e); }}>‹</button>
                        <button className="pp-slider-arrow next" onClick={(e) => { e.stopPropagation(); nextImage(e); }}>›</button>
                    </>
                )}
              </div>
              
              <div className="pp-thumbnails">
                {project.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`pp-thumb ${activeImageIdx === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIdx(idx)}
                  >
                    <img src={img} alt="thumb" />
                  </div>
                ))}
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
                  onClick={() => navigate(`/project/${other.slug}`)}
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
            className="btn-primary" 
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
