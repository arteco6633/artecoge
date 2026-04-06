import React, { useEffect, useState } from 'react';
import './ArticlesPage.css';
import { useNavigate } from 'react-router-dom';
import { articlesData as staticArticles } from '../../data/articlesData';
import { supabase } from '../../supabaseClient';

const ArticlesPage = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching articles:', error);
            setArticles(staticArticles); // Fallback if no table
        } else {
            // Combine with static articles for now or just use dynamic
            setArticles([...(data || []), ...staticArticles]);
        }
        setLoading(false);
    };

    return (
        <div className="articles-page">
            <section className="articles-hero">
                <div className="container">
                    <div className="ap-header">
                        <span className="small-label">/Блог и статьи о мебели в Грузии</span>
                        <h1 className="ap-title">Знания и вдохновение для вашего интерьера в Тбилиси</h1>
                        <p className="ap-subtitle">
                            Мы делимся профессиональным опытом в меблировке, рассказываем об австрийских материалах Egger и помогаем избежать ошибок при заказе кухни в Грузии.
                        </p>
                    </div>
                </div>
            </section>

            <section className="articles-content">
                <div className="container">
                    {loading ? (
                        <div style={{color: '#fff', textAlign: 'center', padding: '100px 0'}}>Загрузка...</div>
                    ) : (
                        <div className="ap-grid">
                            {articles.map(article => (
                                <div key={article.id || article.slug} className="ap-card" onClick={() => navigate(`/article/${article.slug}`)}>
                                    <div className="ap-card-image-wrap">
                                        <img src={article.img} alt={article.title} className="ap-card-img" />
                                        <span className="ap-card-category">{article.category}</span>
                                    </div>
                                    <div className="ap-card-info">
                                        <span className="ap-card-date">{article.date}</span>
                                        <h3 className="ap-card-title">{article.title}</h3>
                                        <p className="ap-card-excerpt">{article.excerpt}</p>
                                        <button className="ap-card-more">Читать полностью</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

      <section className="ap-newsletter">
        <div className="container">
          <div className="ap-newsletter-box">
            <h2 className="ap-newsletter-title">Следите за новыми статьями</h2>
            <p className="ap-newsletter-desc">Подпишитесь, чтобы первыми узнавать о новых проектах и трендах в мире мебели.</p>
            <div className="ap-subscribe-form">
              <input type="email" placeholder="Ваш e-mail" className="ap-input" />
              <button className="ap-btn">Подписаться</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlesPage;
