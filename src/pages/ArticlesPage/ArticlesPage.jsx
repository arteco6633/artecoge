import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ArticlesPage.css';
import { articlesData as staticArticles } from '../../data/articlesData';
import { supabase } from '../../supabaseClient';
import LeadModal from '../../components/FinalForm/LeadModal';
import Hero from '../../components/Hero/Hero';
import heroBgArticles from '../../assets/articles_hero_bg.png';

const ArticlesPage = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('Все');
    const [isSticky, setIsSticky] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalDesc, setModalDesc] = useState('');

    const openModal = (title, desc) => {
        setModalTitle(title);
        setModalDesc(desc);
        setIsModalOpen(true);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchArticles();

        const handleScroll = () => {
            setIsSticky(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchArticles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching articles:', error);
            setArticles(staticArticles);
        } else {
            const dbSlugs = new Set((data || []).map(a => a.slug));
            const uniqueStatic = staticArticles.filter(a => !dbSlugs.has(a.slug));
            setArticles([...(data || []), ...uniqueStatic]);
        }
        setLoading(false);
    };

    const categories = ['Все', ...new Set(articles.map(a => a.category).filter(Boolean))];
    const filteredArticles = activeCategory === 'Все'
        ? articles
        : articles.filter(a => a.category === activeCategory);

    return (
        <motion.div
            className="articles-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            <Hero
                title={<>ЗНАНИЯ И <span className="ap-highlight">ВДОХНОВЕНИЕ</span><br />ДЛЯ ВАШЕГО ИНТЕРЬЕРА</>}
                subtitle=""
                rightText="Мы делимся профессиональным опытом в меблировке, рассказываем об австрийских материалах Egger и помогаем избежать ошибок при заказе мебели."
                bgImage={heroBgArticles}
                showSlider={false}
                compact={true}
                ctaText="Обсудить проект"
                modalTitle="Обсудить проект"
                modalDesc="Оставьте заявку, и мы свяжемся с вами для консультации"
            />

            <div className={`ap-sticky-filter ${isSticky ? 'is-sticky' : ''}`}>
                <div className="container ap-filter-inner">
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
                        <div style={{ color: '#fff', textAlign: 'center', padding: '100px 0' }}>Загрузка...</div>
                    ) : (
                        <div className="ap-grid">
                            {filteredArticles.map(article => (
                                <div key={article.id || article.slug} className="ap-card" onClick={() => navigate(`/article/${article.slug}`)}>
                                    <div className="ap-card-image-wrap">
                                        <img src={article.img} alt={article.title} className="ap-card-img" />
                                        <span className="ap-card-category">{article.category}</span>
                                    </div>
                                    <div className="ap-card-info">
                                        <span className="ap-card-date">{article.date}</span>
                                        <h3 className="ap-card-title">{article.title}</h3>
                                        <p className="ap-card-excerpt">
                                            {article.content ? article.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : ''}
                                        </p>
                                        <button className="ap-card-more">Читать полностью</button>
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
                            <h2 className="ap-cta-title">ЕЩЁ БОЛЬШЕ ИДЕЙ ДЛЯ ВАШЕГО ИНТЕРЬЕРА</h2>
                            <p className="ap-cta-desc">
                                Оставьте заявку на индивидуальный подбор материалов и расчет стоимости проекта.
                                Мы поможем реализовать ваши самые смелые идеи.
                            </p>
                        </div>
                        <button
                            className="btn-orange-pill"
                            onClick={() => openModal('Обсудить проект', 'Оставьте заявку на индивидуальный подбор материалов и расчет стоимости проекта.')}
                        >
                            Обсудить проект
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
        </motion.div>
    );
};

export default ArticlesPage;
