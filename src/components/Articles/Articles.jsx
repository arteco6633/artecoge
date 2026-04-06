import React, { useState, useEffect } from 'react';
import './Articles.css';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const Articles = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3);
        
        if (data) setArticles(data);
        setLoading(false);
    };

    if (loading) return (
        <section className="articles">
            <div className="container" style={{textAlign:'center', padding: '100px 0'}}>
                <div className="loading-dots">Загрузка статей...</div>
            </div>
        </section>
    );

    if (articles.length === 0) return null;

    return (
        <section className="articles" id="articles">
            <div className="container relative-container">
                <div className="articles-top">
                    <h2 className="articles-main-title">Экспертные статьи</h2>
                    <button className="view-all-btn" onClick={() => navigate('/articles')}>Все статьи</button>
                </div>
                
                <div className="articles-slider-wrapper">
                    <div className="articles-grid">
                        {articles.map(a => (
                            <div key={a.id} className="article-expanded-card" onClick={() => navigate(`/article/${a.slug}`)}>
                                <div className="article-img" style={{backgroundImage: `url(${a.img})`}}></div>
                                <div className="article-info">
                                    <h3 className="article-title">{a.title}</h3>
                                    <p className="article-excerpt">{a.excerpt || (a.content ? a.content.substring(0, 100) + '...' : '')}</p>
                                    <span className="article-date">{a.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Articles;
