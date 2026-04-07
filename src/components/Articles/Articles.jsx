import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { motion } from 'framer-motion';
import './Articles.css';

const Articles = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
            }
        }
    };

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
                    <h2 className="articles-main-title">Статьи</h2>
                    <button className="view-all-btn" onClick={() => navigate('/articles')}>Все статьи</button>
                </div>
                
                <div className="articles-slider-wrapper">
                    <motion.div 
                        className="articles-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        {articles.map(a => (
                            <motion.div 
                                key={a.id} 
                                variants={itemVariants}
                                className="article-expanded-card" 
                                onClick={() => navigate(`/article/${a.slug}`)}
                            >
                                <div className="article-img" style={{backgroundImage: `url(${a.img})`}}></div>
                                <div className="article-info">
                                    <h3 className="article-title">{a.title}</h3>
                                    <p className="article-excerpt">
                                        {a.content ? a.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : ''}
                                    </p>
                                    <span className="article-date">{a.date}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Articles;
