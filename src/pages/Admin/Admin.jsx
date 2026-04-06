import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import './Admin.css';

const Admin = () => {
    const [articles, setArticles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        date: '',
        img: '',
        excerpt: '',
        content: '',
        images: {} // Map of tag -> url
    });

    useEffect(() => {
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
            setArticles([]);
        } else {
            setArticles(data || []);
        }
        setLoading(false);
    };

    const handleOpenModal = (article = null) => {
        if (article) {
            setEditingArticle(article);
            setFormData({
                title: article.title || '',
                slug: article.slug || '',
                category: article.category || '',
                date: article.date || '',
                img: article.img || '',
                excerpt: article.excerpt || '',
                content: article.content || '',
                images: article.images || {}
            });
        } else {
            setEditingArticle(null);
            setFormData({
                title: '',
                slug: '',
                category: 'Тренды',
                date: new Date().toLocaleDateString('ru-RU'),
                img: '',
                excerpt: '',
                content: '',
                images: {}
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingArticle(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (name === 'title' && !formData.slug && !editingArticle) {
            const generatedSlug = value
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');
            setFormData(prev => ({ ...prev, slug: generatedSlug }));
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `articles/${fileName}`;

        // Upload to 'articles' bucket
        const { error: uploadError, data } = await supabase.storage
            .from('articles')
            .upload(filePath, file);

        if (uploadError) {
            alert('Ошибка загрузки: ' + uploadError.message + '\nУбедитесь, что вы создали бакет "articles" в Supabase Storage и сделали его публичным.');
            setUploading(false);
            return;
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('articles')
            .getPublicUrl(filePath);

        // Add to images object
        const imageCount = Object.keys(formData.images).length + 1;
        const tag = `IMG${imageCount}`;
        
        setFormData(prev => ({
            ...prev,
            img: prev.img || publicUrl, // Set as main img if none exists
            images: { ...prev.images, [tag]: publicUrl }
        }));
        setUploading(false);
    };

    const insertTag = (tag) => {
        const textarea = document.getElementById('article-content-textarea');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const after = text.substring(end, text.length);
        
        const newText = before + tag + after;
        setFormData(prev => ({ ...prev, content: newText }));
        
        // Reset focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + tag.length, start + tag.length);
        }, 0);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = { ...formData };

        if (editingArticle) {
            const { error } = await supabase
                .from('articles')
                .update(payload)
                .eq('id', editingArticle.id);

            if (error) alert('Error updating: ' + error.message);
        } else {
            const { error } = await supabase
                .from('articles')
                .insert([payload]);

            if (error) alert('Error creating: ' + error.message);
        }

        setLoading(false);
        handleCloseModal();
        fetchArticles();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту статью?')) return;
        setLoading(true);
        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (error) alert('Error deleting: ' + error.message);
        setLoading(false);
        fetchArticles();
    };

    // Render Preview Logic
    const renderPreview = () => {
        if (!formData.content) return <p style={{color: '#444'}}>Предпросмотр будет здесь...</p>;
        
        return formData.content.split('\n').map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={idx} />;
            
            if (trimmed.startsWith('###')) {
                return <h3 key={idx}>{trimmed.replace('###', '').trim()}</h3>;
            }
            
            if (trimmed.startsWith('-')) {
                return <li key={idx}>{trimmed.replace('-', '').trim()}</li>;
            }
            
            if (trimmed.startsWith('[[')) {
                const imgKey = trimmed.replace('[[', '').replace(']]', '');
                if (formData.images && formData.images[imgKey]) {
                    return <img key={idx} src={formData.images[imgKey]} alt="article" />;
                }
            }

            return <p key={idx}>{trimmed}</p>;
        });
    };

    return (
        <div className="admin-container">
            <div className="container">
                <div className="admin-header">
                    <h1 className="admin-title">Управление контентом</h1>
                    <button className="admin-add-btn" onClick={() => handleOpenModal()}>
                        + Новая статья
                    </button>
                </div>

                {loading && !isModalOpen ? (
                    <div className="admin-loading">Загрузка данных...</div>
                ) : (
                    <div className="admin-articles-list">
                        {articles.length === 0 ? (
                            <p style={{color: '#666', textAlign: 'center', marginTop: '40px'}}>Статей в базе нет.</p>
                        ) : (
                            articles.map(article => (
                                <div key={article.id} className="admin-article-item">
                                    <div className="admin-article-info">
                                        <h3>{article.title}</h3>
                                        <p>{article.category} • {article.date} • /{article.slug}</p>
                                    </div>
                                    <div className="admin-article-actions">
                                        <button className="admin-btn-edit" onClick={() => handleOpenModal(article)}>Изменить</button>
                                        <button className="admin-btn-delete" onClick={() => handleDelete(article.id)}>Удалить</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '30px'}}>
                            <h2 style={{margin:0}}>{editingArticle ? 'Редактирование статьи' : 'Создание статьи'}</h2>
                            <button className="admin-btn-cancel" onClick={handleCloseModal}>✕ Закрыть</button>
                        </div>
                        
                        <div className="admin-editor-layout">
                            <div className="admin-editor-form">
                                <form onSubmit={handleSave} className="admin-form">
                                    <div className="admin-form-group full" style={{marginBottom:'20px'}}>
                                        <label>Заголовок статьи</label>
                                        <input 
                                            type="text" name="title" value={formData.title} 
                                            onChange={handleInputChange} required className="admin-input"
                                            placeholder="Введите заголовок..."
                                        />
                                    </div>

                                    <div className="admin-form-grid" style={{marginBottom:'20px'}}>
                                        <div className="admin-form-group">
                                            <label>URL (Slug)</label>
                                            <input 
                                                type="text" name="slug" value={formData.slug} 
                                                onChange={handleInputChange} required className="admin-input"
                                            />
                                        </div>
                                        <div className="admin-form-group">
                                            <label>Категория</label>
                                            <input 
                                                type="text" name="category" value={formData.category} 
                                                onChange={handleInputChange} className="admin-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="admin-image-upload-zone" onClick={() => fileInputRef.current.click()}>
                                        <input 
                                            type="file" ref={fileInputRef} style={{display:'none'}} 
                                            accept="image/*" onChange={handleImageUpload} 
                                        />
                                        {uploading ? 'Загрузка фото...' : 'Нажмите, чтобы загрузить фотографии в статью'}
                                    </div>

                                    {Object.keys(formData.images).length > 0 && (
                                        <div style={{marginBottom:'20px'}}>
                                            <label>Галерея статьи:</label>
                                            <div className="admin-image-grid">
                                                {Object.entries(formData.images).map(([tag, url]) => (
                                                    <div 
                                                        key={tag} 
                                                        className={`admin-image-thumb ${formData.img === url ? 'is-cover' : ''}`}
                                                    >
                                                        <img src={url} alt={tag} />
                                                        {formData.img === url && <span className="admin-cover-badge">Обложка</span>}
                                                        <div className="admin-image-thumb-overlay">
                                                            <button 
                                                                type="button" 
                                                                className="admin-overlay-btn"
                                                                onClick={() => insertTag(`[[${tag}]]`)}
                                                            >
                                                                Вставить в текст
                                                            </button>
                                                            <button 
                                                                type="button" 
                                                                className="admin-overlay-btn secondary"
                                                                onClick={() => setFormData(prev => ({ ...prev, img: url }))}
                                                            >
                                                                Сделать обложкой
                                                            </button>
                                                        </div>
                                                        <span className="admin-image-tag-label">{tag}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="admin-toolbar">
                                        <button type="button" className="admin-toolbar-btn" onClick={() => insertTag('### ')}>Заголовок</button>
                                        <button type="button" className="admin-toolbar-btn" onClick={() => insertTag('- ')}>Список</button>
                                        <button type="button" className="admin-toolbar-btn" onClick={() => insertTag('**текст**')}>Жирный</button>
                                        <button type="button" className="admin-toolbar-btn" onClick={() => insertTag('\n---\n')}>Разделитель</button>
                                    </div>

                                    <div className="admin-form-group full">
                                        <label>Текст статьи (Markdown-стиль)</label>
                                        <textarea 
                                            id="article-content-textarea"
                                            name="content" value={formData.content} 
                                            onChange={handleInputChange} className="admin-textarea content"
                                            placeholder="Пишите здесь... Используйте [[IMG1]] для вставки картинок."
                                        />
                                    </div>

                                    <div className="admin-form-group full" style={{marginTop:'20px'}}>
                                        <label>Краткий анонс (для списка статей)</label>
                                        <textarea 
                                            name="excerpt" value={formData.excerpt} 
                                            onChange={handleInputChange} className="admin-textarea"
                                            placeholder="Пару предложений о чем статья..."
                                        />
                                    </div>

                                    <div className="admin-form-actions" style={{marginTop:'30px'}}>
                                        <button type="submit" className="admin-btn-save" disabled={loading || uploading}>
                                            {loading ? 'Сохранение...' : (editingArticle ? 'Сохранить изменения' : 'Опубликовать статью')}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="admin-preview-pane">
                                <span className="admin-preview-label">Предпросмотр</span>
                                <div className="admin-preview-content article-text-wrapper">
                                    <h1 style={{color:'#fff', marginBottom:'20px'}}>{formData.title || 'Заголовок статьи'}</h1>
                                    {formData.img && <img src={formData.img} alt="Main" style={{width:'100%', borderRadius:'8px', marginBottom:'30px'}} />}
                                    {renderPreview()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
