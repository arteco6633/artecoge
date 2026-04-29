import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './CatalogPage.css';
import Hero from '../../components/Hero/Hero';
import catalogHero from '../../assets/catalog_hero.png';
import ImageLightbox from '../../components/ImageLightbox/ImageLightbox';
import { useModal } from '../../ModalContext';
import { supabase } from '../../supabaseClient';
import { useLang } from '../../i18n/context';

const CatalogPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [lightboxData, setLightboxData] = useState(null);
  const { t } = useLang();
  const cp = t.catalogPage;
  const [expandedProjects, setExpandedProjects] = useState({});

  const toggleProject = (id) => {
    setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const SECTION_ORDER = ['kitchens', 'wardrobes', 'cabinet', 'shelves', 'panels', 'bathrooms'];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
    const handleScroll = () => setIsSticky(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLightbox = (images, index = 0) => setLightboxData({ images, index });

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('type', 'catalog')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const grouped = data.reduce((acc, project) => {
        const cat = project.category || 'kitchens';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(project);
        return acc;
      }, {});

      const finalSections = SECTION_ORDER
        .filter(key => grouped[key] && grouped[key].length > 0)
        .map(key => ({ id: key, projects: grouped[key] }));

      setSections(finalSections);
    }
    setLoading(false);
  };

  if (loading) return <div className="loading-state">{cp.loading}</div>;

  const heroTitle = <>{cp.heroTitle1} <span className="highlight-orange-italic">{cp.heroHighlight}</span><br />{cp.heroTitle2}</>;

  return (
    <div className="catalog-page-container">
      <Hero
        title={heroTitle}
        rightText={cp.heroRight}
        showSlider={true}
        compact={false}
        bgImage={catalogHero}
        ctaText="Рассчитать"
      />

      {/* Navigation */}
      <div className={`cp-sticky-nav ${isSticky ? 'is-sticky' : ''}`}>
        <div className="container cp-nav-inner">
          {sections.map(s => (
            <a key={s.id} href={`#${s.id}`} className="cp-nav-link">
              {cp.sections[s.id]?.title || s.id.toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      {sections.map((section) => {
        const meta = cp.sections[section.id] || {};
        return (
          <section key={section.id} id={section.id} className="cp-section">
            <div className="container">
              <h2 className="cp-section-title">{meta.title || section.id.toUpperCase()}</h2>

              <div className="cp-projects-list">
                {section.projects.map((project, pIdx) => (
                  <div key={pIdx} className="cp-project">
                    <div className="cp-project-header">
                      <div className="cp-project-title-area">
                        <h3 className="cp-project-name">
                          {project.name} <span className="cp-project-category-suffix">{cp.projectSuffix}</span>
                        </h3>
                      </div>
                      <p className="cp-project-description-top">
                        {project.desc?.substring(0, 160) || cp.defaultDesc}
                      </p>
                    </div>

                    <div className="cp-carousel-header">
                      <div className="cp-swipe-animation-wrapper">
                        <div className="cp-swipe-slides">
                          <div className="cp-swipe-slide"></div>
                          <div className="cp-swipe-slide"></div>
                          <div className="cp-swipe-slide"></div>
                        </div>
                        <div className="cp-swipe-hand">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="cp-project-image-carousel">
                      {(project.images || project.image_urls || []).map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt={project.name}
                          className="cp-carousel-img"
                          onClick={() => openLightbox(project.images || project.image_urls, i)}
                          style={{ cursor: 'zoom-in' }}
                        />
                      ))}
                    </div>

                    <div className="cp-project-footer">
                      <div className="cp-result-box">
                        <div 
                          className="cp-result-header" 
                          onClick={() => toggleProject(project.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <h4 className="cp-result-title">
                            {cp.resultTitle}
                            <span className="cp-expand-icon mobile-only">
                              {expandedProjects[project.id] ? '−' : '+'}
                            </span>
                          </h4>
                          <Link to={`/catalog/${project.slug || project.id}`} className="cp-details-link desktop-only">
                            {cp.detailsLink}
                          </Link>
                        </div>

                        {/* Mobile: View Photos Styled like Result Header */}
                        <div 
                          className="cp-result-header cp-view-photos-header mobile-only" 
                          onClick={() => openLightbox(project.images || project.image_urls, 0)}
                          style={{ cursor: 'pointer', marginTop: '12px' }}
                        >
                          <h4 className="cp-result-title">
                            {cp.viewPhotos}
                            <span className="cp-expand-icon">→</span>
                          </h4>
                        </div>
                        <div className={`cp-result-collapse ${expandedProjects[project.id] ? 'is-expanded' : ''}`}>
                          <p className="cp-result-text">
                            {project.result || cp.defaultResult}
                          </p>
                          <Link to={`/catalog/${project.slug || project.id}`} className="cp-details-link mobile-only">
                            {cp.detailsLink}
                          </Link>
                        </div>
                      </div>

                      <div className="cp-actions-area">
                        <button
                          className="cp-view-all-link desktop-only"
                          onClick={() => openLightbox(project.images || project.image_urls, 0)}
                          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                        >
                          {cp.viewPhotos}
                        </button>
                        <button
                          className="btn-orange-pill"
                          onClick={() => openModal(meta.ctaTitle, meta.ctaDesc)}
                        >
                          {cp.calcPrice}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cp-section-cta">
                <div className="cp-cta-block">
                  <div className="cp-cta-text">
                    <span className="cp-cta-label">{cp.wantSimilar}</span>
                    <h3 className="cp-cta-title">{meta.ctaTitle}</h3>
                    <p className="cp-cta-desc">{meta.ctaDesc}</p>
                  </div>
                  <button
                    className="btn-orange-pill"
                    onClick={() => openModal(meta.ctaTitle, meta.ctaDesc)}
                  >
                    {cp.discussProject}
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {sections.length === 0 && (
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <p style={{ color: '#666' }}>{cp.empty}</p>
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
