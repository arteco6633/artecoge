import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { articlesData as staticArticles } from '../../data/articlesData';
import { supabase } from '../../supabaseClient';
import './ArticleSingle.css';

const ArticleSingle = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchArticle();
    }, [slug]);

    const fetchArticle = async () => {
        setLoading(true);
        // Try to find in Supabase
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('slug', slug)
            .single();

        let currentArticle = null;

        if (error || !data) {
            // Fallback to static data
            currentArticle = staticArticles.find(a => a.slug === slug);
        } else {
            currentArticle = data;
        }

        setArticle(currentArticle);
        
        // Fetch related from Supabase + static
        if (currentArticle) {
            const { data: dbRelated } = await supabase
                .from('articles')
                .select('*')
                .neq('slug', slug)
                .limit(3);
            
            const combinedRelated = [...(dbRelated || []), ...staticArticles.filter(a => a.slug !== slug)].slice(0, 3);
            setRelated(combinedRelated);
        }
        
        setLoading(false);
    };

    if (loading) {
        return <div style={{color: '#fff', textAlign: 'center', padding: '100px 0'}}>Загрузка...</div>;
    }

    if (!article) {
        return (
            <div className="article-not-found">
                <div className="container">
                    <h2>Статья не найдена</h2>
                    <button onClick={() => navigate('/articles')} className="back-btn">Вернуться к списку</button>
                </div>
            </div>
        );
    }

    return (
        <article className="article-single-page">
            <header className="article-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${article.img})` }}>
                <div className="container">
                    <div className="article-hero-content">
                        <Link to="/articles" className="breadcrumb">← Все статьи</Link>
                        <span className="article-category-tag">{article.category}</span>
                        <h1 className="article-main-title">{article.title}</h1>
                        <div className="article-meta">
                            <span className="article-date">{article.date}</span>
                            <span className="article-author">Эксперт ARTECO</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="article-body-container">
                <div className="container">
                    <div className="article-layout">
                        <div className="article-content-main">
                            <div className="article-text-wrapper">
                                {article.content.split('\n').map((line, idx) => {
                                    const trimmed = line.trim();
                                    if (!trimmed) return <br key={idx} />;
                                    
                                    if (trimmed.startsWith('###')) {
                                        return <h3 key={idx} className="article-sub-h3">{trimmed.replace('###', '').trim()}</h3>;
                                    }
                                    
                                    if (trimmed.startsWith('-')) {
                                        return <li key={idx} className="article-li">{trimmed.replace('-', '').trim()}</li>;
                                    }

                                    // Handle [[IMG1]] or just IMG1
                                    const imgKeyMatch = trimmed.match(/^\[?\[?(IMG\d+)\]?\]?$/);
                                    if (imgKeyMatch) {
                                        const imgKey = imgKeyMatch[1];
                                        if (article.images && article.images[imgKey]) {
                                            return (
                                                <div key={idx} className="article-body-image-wrap">
                                                    <img src={article.images[imgKey]} alt={article.title} className="article-body-img" />
                                                </div>
                                            );
                                        }
                                    }

                                    return <p key={idx}>{trimmed}</p>;
                                })}
                            </div>
                            
                            <div className="article-cta-box">
                                <h3>Нужна консультация по мелировке в Тбилиси?</h3>
                                <p>Наши эксперты помогут подобрать материалы и рассчитать стоимость вашего проекта.</p>
                                <button className="article-cta-btn">Оставить заявку</button>
                            </div>
                        </div>

                        <aside className="article-sidebar">
                            <div className="sidebar-box">
                                <h4>Другие статьи</h4>
                                <div className="sidebar-list">
                                    {related.map(rel => (
                                        <Link key={rel.id || rel.slug} to={`/article/${rel.slug}`} className="sidebar-item">
                                            <div className="sidebar-item-img" style={{ backgroundImage: `url(${rel.img})` }}></div>
                                            <div className="sidebar-item-text">
                                                <h5>{rel.title}</h5>
                                                <span>{rel.date}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ArticleSingle;
