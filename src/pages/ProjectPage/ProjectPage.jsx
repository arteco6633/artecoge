import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../ModalContext';
import { supabase } from '../../supabaseClient';
import './ProjectPage.css';
import { useLang } from '../../i18n/context';

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { t } = useLang();
  const pp = t.projectPage;

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
      fetchOtherProjects(data.slug);
    } else {
      console.error("Project not found:", error);
    }
    setLoading(false);
  };

  const fetchOtherProjects = async (currentSlug) => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .neq('slug', currentSlug)
      .order('created_at', { ascending: false });
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

  if (loading) return <div className="admin-loading" style={{padding: '200px 0', textAlign:'center', color: '#fff'}}>{pp.loading}</div>;
  if (!project) return (
    <div style={{padding: '200px 0', textAlign:'center', color: '#fff'}}>
      {pp.notFound} <button onClick={() => navigate('/')}>{pp.goHome}</button>
    </div>
  );

  const sectionMeta = pp.sections[project.category] || {};

  return (
    <div className="project-page">
      <div className="container">
        <button className="pp-back-btn" onClick={() => navigate(-1)}>
          {pp.back}
        </button>

        <div className="pp-content-layout">
          <div className="pp-header">
            <h1 className="pp-title">{project.name}</h1>
            <div className="pp-intro-grid">
              <div className="pp-intro-block main">
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

              {project.result && (
                <div className="pp-result-block">
                  <div className="pp-result-badge">{pp.resultBadge}</div>
                  <p className="pp-result-text">{project.result}</p>
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
                    <img 
                      src={img} 
                      alt={`${project.name} photo ${idx + 1}`} 
                      loading="lazy"
                      decoding="async"
                    />
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
                    <span className="cp-cta-label">{pp.wantSimilar}</span>
                    <h3 className="cp-cta-title">
                      {sectionMeta.ctaTitle || pp.individualProject}
                    </h3>
                    <p className="cp-cta-desc">
                      {sectionMeta.ctaDesc || pp.defaultCtaDesc}
                    </p>
                  </div>
                  <button
                    className="btn-orange-pill"
                    onClick={() => openModal(pp.calcPrice, project.name)}
                  >
                    {pp.calcPrice}
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
            <div className="pp-other-header">
              <h2 className="pp-other-title">{pp.seeAlso}</h2>
              {otherProjects.length > 1 && (
                <div className="pp-swipe-animation-wrapper">
                  <div className="pp-swipe-slides">
                    <div className="pp-swipe-slide"></div>
                    <div className="pp-swipe-slide"></div>
                    <div className="pp-swipe-slide"></div>
                  </div>
                  <div className="pp-swipe-hand">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                    </svg>
                  </div>
                </div>
              )}
            </div>
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
                    <span className="pp-other-link">{pp.goTo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pp-cta" style={{ backgroundImage: `url(${project.images[0]})` }}>
          <h2 className="pp-cta-title">{pp.ctaTitle}</h2>
          <p className="pp-cta-desc">{pp.ctaDesc}</p>
          <button
            className="btn-orange-pill"
            onClick={() => openModal(pp.discussProject, project.name)}
          >
            {pp.ctaBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
