import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import './Admin.css';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('articles'); // 'articles' or 'projects'
    const [articles, setArticles] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    
    // Form for Articles
    const [articleForm, setArticleForm] = useState({
        title: '', slug: '', category: '', date: '', img: '', excerpt: '', content: '', images: {}
    });

    // Form for Projects
    const [projectForm, setProjectForm] = useState({
        name: '', slug: '', desc: '', images: [], 
        details: [
            { label: 'Объект', value: '' },
            { label: 'Материалы', value: '' },
            { label: 'Фурнитура', value: '' }
        ]
    });

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        if (activeTab === 'articles') {
            const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
            setArticles(data || []);
        } else {
            const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
            setProjects(data || []);
        }
        setLoading(false);
    };

    const generateSlug = (text) => {
        return text
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-а-яА-ЯёЁ]/g, '') // Allow letters, numbers, spaces, and dashes
            .replace(/\s+/g, '-')             // Replace spaces with dashes
            .replace(/-+/g, '-')              // Replace multiple dashes with single dash
            .replace(/^-+|-+$/g, '');         // Remove leading/trailing dashes
    };

    const handleOpenModal = (item = null) => {
        if (activeTab === 'articles') {
            if (item) {
                setEditingItem(item);
                setArticleForm({ ...item, images: item.images || {} });
            } else {
                setEditingItem(null);
                setArticleForm({
                    title: '', slug: '', category: 'Тренды', 
                    date: new Date().toLocaleDateString('ru-RU'),
                    img: '', excerpt: '', content: '', images: {}
                });
            }
        } else {
            if (item) {
                setEditingItem(item);
                setProjectForm({ 
                    name: item.name || '', 
                    slug: item.slug || '', 
                    desc: item.desc || '', 
                    images: item.images || [],
                    details: (item.details && item.details.length > 0) ? item.details : [
                        { label: 'Объект', value: '' },
                        { label: 'Материалы', value: '' },
                        { label: 'Фурнитура', value: '' }
                    ]
                });
            } else {
                setEditingItem(null);
                setProjectForm({
                    name: '', slug: '', desc: '', images: [],
                    details: [
                        { label: 'Объект', value: '' },
                        { label: 'Материалы', value: '' },
                        { label: 'Фурнитура', value: '' }
                    ]
                });
            }
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleInputChange = (e, formType) => {
        const { name, value } = e.target;
        if (formType === 'article') {
            setArticleForm(prev => {
                const updated = { ...prev, [name]: value };
                if (name === 'title' && !editingItem) {
                    updated.slug = generateSlug(value);
                }
                return updated;
            });
        } else {
            setProjectForm(prev => {
                const updated = { ...prev, [name]: value };
                if (name === 'name' && !editingItem) {
                    updated.slug = generateSlug(value);
                }
                return updated;
            });
        }
    };

    const insertToTextarea = (text) => {
        if (!textareaRef.current) return;
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const content = articleForm.content;
        const newContent = content.substring(0, start) + text + content.substring(end);
        setArticleForm(prev => ({ ...prev, content: newContent }));
        
        // Return focus
        setTimeout(() => {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(start + text.length, start + text.length);
        }, 10);
    };

    // Project Details Management
    const handleDetailChange = (index, field, value) => {
        const newDetails = [...projectForm.details];
        newDetails[index][field] = value;
        setProjectForm(prev => ({ ...prev, details: newDetails }));
    };

    const addDetail = () => {
        setProjectForm(prev => ({ ...prev, details: [...prev.details, { label: '', value: '' }] }));
    };

    const removeDetail = (index) => {
        setProjectForm(prev => ({ ...prev, details: projectForm.details.filter((_, i) => i !== index) }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        const bucket = activeTab === 'articles' ? 'articles' : 'projects';
        const newUrls = [];

        for (const file of files) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);

            if (uploadError) {
                console.error("Upload error:", uploadError);
                alert(`Ошибка загрузки: ${uploadError.message}. Убедитесь, что бакет "${bucket}" создан и настройки RLS позволяют загрузку!`);
                setUploading(false);
                return;
            }

            const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
            newUrls.push(publicUrl);
        }

        if (activeTab === 'articles') {
            const updatedImages = { ...articleForm.images };
            newUrls.forEach(url => {
                const tag = `IMG${Object.keys(updatedImages).length + 1}`;
                updatedImages[tag] = url;
            });
            setArticleForm(prev => ({
                ...prev,
                img: prev.img || newUrls[0],
                images: updatedImages
            }));
        } else {
            setProjectForm(prev => ({
                ...prev,
                images: [...prev.images, ...newUrls]
            }));
        }
        setUploading(false);
    };

    const removeImage = (indexOrTag) => {
        if (activeTab === 'articles') {
            const updatedImages = { ...articleForm.images };
            delete updatedImages[indexOrTag];
            setArticleForm(prev => ({ ...prev, images: updatedImages }));
        } else {
            setProjectForm(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== indexOrTag)
            }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        const table = activeTab === 'articles' ? 'articles' : 'projects';
        
        // Ensure slug is clean one last time
        const cleanSlug = generateSlug(activeTab === 'articles' ? articleForm.slug : projectForm.slug);
        const payload = activeTab === 'articles' 
            ? { ...articleForm, slug: cleanSlug } 
            : { ...projectForm, slug: cleanSlug };

        let result;
        if (editingItem) {
            result = await supabase.from(table).update(payload).eq('id', editingItem.id);
        } else {
            result = await supabase.from(table).insert([payload]);
        }

        if (result.error) {
            alert("Ошибка сохранения: " + result.error.message);
        } else {
            handleCloseModal();
            fetchData();
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот элемент?')) return;
        const table = activeTab === 'articles' ? 'articles' : 'projects';
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) alert("Ошибка удаления: " + error.message);
        fetchData();
    };

    // Render Article Preview
    const renderPreview = () => {
        if (!articleForm.content) return <p style={{color: '#666'}}>Контент статьи пуст...</p>;
        
        return articleForm.content.split('\n').map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={idx} />;
            
            if (trimmed.startsWith('###')) {
                return <h3 key={idx} className="preview-h3">{trimmed.replace('###', '').trim()}</h3>;
            }
            
            if (trimmed.startsWith('-')) {
                return <li key={idx} className="preview-li">{trimmed.replace('-', '').trim()}</li>;
            }

            const imgKeyMatch = trimmed.match(/^\[?\[?(IMG\d+)\]?\]?$/);
            if (imgKeyMatch) {
                const imgKey = imgKeyMatch[1];
                if (articleForm.images && articleForm.images[imgKey]) {
                    return (
                        <div key={idx} className="preview-img-wrap">
                            <img src={articleForm.images[imgKey]} alt="preview" />
                            <small>{imgKey}</small>
                        </div>
                    );
                }
            }

            return <p key={idx}>{trimmed}</p>;
        });
    };

    return (
        <div className="admin-container">
            <div className="container">
                <div className="admin-tabs">
                    <button className={activeTab === 'articles' ? 'active' : ''} onClick={() => setActiveTab('articles')}>Статьи</button>
                    <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>Проекты</button>
                </div>

                <div className="admin-header">
                    <h1 className="admin-title">{activeTab === 'articles' ? 'Управление статьями' : 'Управление проектами'}</h1>
                    <button className="admin-add-btn" onClick={() => handleOpenModal()}>
                        + {activeTab === 'articles' ? 'Добавить статью' : 'Добавить проект'}
                    </button>
                </div>

                <div className="admin-list">
                    {loading && !isModalOpen ? (
                        <div className="admin-loading">Загрузка данных...</div>
                    ) : (
                        (activeTab === 'articles' ? articles : projects).map(item => (
                            <div key={item.id} className="admin-item-card">
                                <div className="admin-item-preview" style={{ backgroundImage: `url(${item.img || (item.images && item.images[0])})` }}>
                                    {!item.img && !(item.images && item.images[0]) && <div style={{padding: '20px', color: '#666'}}>Нет фото</div>}
                                </div>
                                <div className="admin-item-info">
                                    <h3>{item.title || item.name}</h3>
                                    <p>URL-адрес: /{item.slug}</p>
                                </div>
                                <div className="admin-item-actions">
                                    <button onClick={() => handleOpenModal(item)}>Править</button>
                                    <button className="delete" onClick={() => handleDelete(item.id)}>Удалить</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal full-screen">
                        <div className="admin-modal-header">
                            <h2>{editingItem ? 'Редактирование' : 'Новое'} / {activeTab === 'articles' ? 'Статья' : 'Проект'}</h2>
                            <button className="close-btn" onClick={handleCloseModal}>✕</button>
                        </div>
                        
                        <form onSubmit={handleSave} className="admin-editor-form">
                            <div className="editor-columns">
                                <div className="editor-main">
                                    {activeTab === 'articles' ? (
                                        <div className="article-editor-split">
                                            <div className="editor-form-pane">
                                                <div className="form-group">
                                                    <label>Заголовок статьи</label>
                                                    <input type="text" name="title" value={articleForm.title} onChange={(e) => handleInputChange(e, 'article')} required placeholder="Например: Как выбрать идеальное кресло" />
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>Slug (часть URL)</label>
                                                        <input type="text" name="slug" value={articleForm.slug} onChange={(e) => handleInputChange(e, 'article')} required placeholder="kak-vybrat-kreslo" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Категория</label>
                                                        <input type="text" name="category" value={articleForm.category} onChange={(e) => handleInputChange(e, 'article')} placeholder="Тренды" />
                                                    </div>
                                                </div>
                                                
                                                <div className="article-toolbar">
                                                    <button type="button" onClick={() => insertToTextarea('### ')} title="Заголовок">H3</button>
                                                    <button type="button" onClick={() => insertToTextarea('- ')} title="Список">List</button>
                                                    <button type="button" onClick={() => insertToTextarea('\nIMG1\n')} title="Вставить фото 1">IMG1</button>
                                                    <button type="button" onClick={() => insertToTextarea('\nIMG2\n')} title="Вставить фото 2">IMG2</button>
                                                </div>

                                                <div className="form-group">
                                                    <textarea 
                                                        ref={textareaRef}
                                                        name="content" 
                                                        value={articleForm.content} 
                                                        onChange={(e) => handleInputChange(e, 'article')} 
                                                        className="tall-textarea" 
                                                        placeholder="Начните писать здесь..." 
                                                    />
                                                </div>
                                            </div>

                                            <div className="editor-preview-pane">
                                                <label>Предпросмотр:</label>
                                                <div className="article-preview-content">
                                                    <h1>{articleForm.title || 'Заголовок появится здесь'}</h1>
                                                    {renderPreview()}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="form-group">
                                                <label>Название ЖК или объекта</label>
                                                <input type="text" name="name" value={projectForm.name} onChange={(e) => handleInputChange(e, 'project')} required placeholder="Например: ЖК Archi Lilac" />
                                            </div>
                                            <div className="form-group">
                                                <label>Slug (часть URL)</label>
                                                <input type="text" name="slug" value={projectForm.slug} onChange={(e) => handleInputChange(e, 'project')} required placeholder="archi-lilac-project" />
                                            </div>
                                            <div className="form-group">
                                                <label>Полное описание проекта</label>
                                                <textarea name="desc" value={projectForm.desc} onChange={(e) => handleInputChange(e, 'project')} className="mid-textarea" placeholder="Опишите особенности проекта..." />
                                            </div>
                                            
                                            <div className="project-details-editor">
                                                <h3>Характеристики</h3>
                                                {projectForm.details.map((detail, idx) => (
                                                    <div key={idx} className="detail-row">
                                                        <input placeholder="Параметр (напр. Объект)" value={detail.label} onChange={(e) => handleDetailChange(idx, 'label', e.target.value)} />
                                                        <input placeholder="Значение" value={detail.value} onChange={(e) => handleDetailChange(idx, 'value', e.target.value)} />
                                                        <button type="button" className="remove-btn" onClick={() => removeDetail(idx)}>✕</button>
                                                    </div>
                                                ))}
                                                <button type="button" className="add-detail-btn" onClick={addDetail}>+ Добавить характеристику</button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="editor-sidebar">
                                    <button type="submit" className="save-btn" disabled={loading || uploading}>
                                        {loading ? 'Сохранение...' : 'Опубликовать'}
                                    </button>

                                    <div className="image-manager">
                                        <h3>Галерея</h3>
                                        <div className="upload-box" onClick={() => fileInputRef.current.click()}>
                                            <label>{uploading ? 'Загрузка...' : 'Загрузить фото'}</label>
                                            <input type="file" ref={fileInputRef} style={{display:'none'}} onChange={handleImageUpload} multiple accept="image/*" />
                                        </div>
                                        <div className="admin-image-grid">
                                            {activeTab === 'articles' ? (
                                                Object.entries(articleForm.images).map(([tag, url]) => (
                                                    <div key={tag} className="admin-thumb">
                                                        <img src={url} alt={tag} />
                                                        {articleForm.img === url && <span className="main-badge">Гл.</span>}
                                                        <button type="button" className="set-main" onClick={() => setArticleForm({...articleForm, img: url})} title="Сделать главным">★</button>
                                                        <button type="button" className="set-main" style={{right: '40px', background: 'rgba(255,0,0,0.5)'}} onClick={() => removeImage(tag)}>✕</button>
                                                        <div style={{position:'absolute', bottom:0, left:0, right:0, background:'rgba(0,0,0,0.5)', fontSize:8, textAlign:'center'}}>{tag}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                projectForm.images.map((url, i) => (
                                                    <div key={i} className="admin-thumb">
                                                        <img src={url} alt={`img-${i}`} />
                                                        {i === 0 && <span className="main-badge">Гл.</span>}
                                                        <button type="button" className="set-main" onClick={() => setProjectForm({...projectForm, images: [url, ...projectForm.images.filter(u => u !== url)]})} title="Сделать главным">★</button>
                                                        <button type="button" className="set-main" style={{right: '40px', background: 'rgba(255,0,0,0.5)'}} onClick={() => removeImage(i)}>✕</button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
