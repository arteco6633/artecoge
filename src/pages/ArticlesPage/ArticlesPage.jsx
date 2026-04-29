import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArticlesPage.css';
import { articlesData as staticArticles } from '../../data/articlesData';
import { supabase } from '../../supabaseClient';
import LeadModal from '../../components/FinalForm/LeadModal';
import Hero from '../../components/Hero/Hero';
import heroBgArticles from '../../assets/articles_hero_bg.png';
import { useLang } from '../../i18n/context';

const ArticlesPage = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalDesc, setModalDesc] = useState('');
    const { t } = useLang();
    const ap = t.articlesPage;

    const openModal = (title, desc) => {
        setModalTitle(title);
        setModalDesc(desc);
        setIsModalOpen(true);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchArticles();
        const handleScroll = () => setIsSticky(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Reset active category when language changes
    useEffect(() => {
        setActiveCategory(null);
    }, [t]);

    const fetchArticles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setArticles(staticArticles);
        } else {
            const dbSlugs = new Set((data || []).map(a => a.slug));
            const uniqueStatic = staticArticles.filter(a => !dbSlugs.has(a.slug));
            setArticles([...(data || []), ...uniqueStatic]);
        }
        setLoading(false);
    };

    const categories = [...new Set(articles.map(a => a.category).filter(Boolean))];
    const filteredArticles = activeCategory
        ? articles.filter(a => a.category === activeCategory)
        : articles;

    const heroTitle = <>{ap.heroTitle1} <span className="ap-highlight">{ap.heroHighlight}</span><br />{ap.heroTitle2}</>;

    return (
        <div className="articles-page">
            <Hero
                title={heroTitle}
                rightText={ap.heroRight}
                bgImage={heroBgArticles}
                showSlider={true}
                compact={false}
            />

            <div className={`ap-sticky-filter ${isSticky ? 'is-sticky' : ''}`}>
                <div className="container ap-filter-inner">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`ap-filter-btn ${!activeCategory ? 'active' : ''}`}
                    >
                        {ap.filterAll}
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`ap-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <section className="articles-content">
                <div className="container">
                    {loading ? (
                        <div style={{ color: '#fff', textAlign: 'center', padding: '100px 0' }}>{ap.loading}</div>
                    ) : (
                        <div className="ap-grid">
                            {filteredArticles.map(article => (
                                <div key={article.id || article.slug} className="ap-card" onClick={() => navigate(`/article/${article.slug}`)}>
                                    <div className="ap-card-image-wrap">
                                        <img 
                                          src={article.img} 
                                          alt={article.title} 
                                          className="ap-card-img" 
                                          loading="lazy"
                                          decoding="async"
                                        />
                                        <span className="ap-card-category">{article.category}</span>
                                    </div>
                                    <div className="ap-card-info">
                                        <span className="ap-card-date">{article.date}</span>
                                        <h3 className="ap-card-title">{article.title}</h3>
                                        <p className="ap-card-excerpt">
                                            {article.content ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : ''}
                                        </p>
                                        <button className="ap-card-more">{ap.readMore}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="ap-cta-section">
                <div className="container">
                    <div className="ap-cta-anchor">
                        <div className="ap-cta-info">
                            <h2 className="ap-cta-title">{ap.ctaTitle}</h2>
                            <p className="ap-cta-desc">{ap.ctaDesc}</p>
                        </div>
                        <button
                            className="btn-orange-pill"
                            onClick={() => openModal(ap.ctaBtn, ap.ctaDesc)}
                        >
                            {ap.ctaBtn}
                        </button>
                    </div>
                </div>
            </section>

            <LeadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalTitle}
                subtitle={modalDesc}
            />
        </div>
    );
};

export default ArticlesPage;
