import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import './Admin.css';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('articles'); // 'articles', 'projects', or 'catalog'
    const [articles, setArticles] = useState([]);
    const [projects, setProjects] = useState([]);
    const [catalogItems, setCatalogItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(localStorage.getItem('admin_auth') === 'true');
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [authError, setAuthError] = useState('');
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);

    // Form for Articles
    const [articleForm, setArticleForm] = useState({
        title: '', slug: '', category: '', date: '', img: '', excerpt: '', content: '', images: {}
    });

    // Form for Portfolio Projects
    const [projectForm, setProjectForm] = useState({
        name: '', slug: '', desc: '', images: [], type: 'portfolio',
        details: [
            { label: 'Объект', value: '' },
            { label: 'Материалы', value: '' },
            { label: 'Фурнитура', value: '' }
        ]
    });

    // Form for Catalog Projects
    const [catalogForm, setCatalogForm] = useState({
        name: '', slug: '', category: 'kitchens', desc: '', images: [], type: 'catalog',
        details: []
    });

    useEffect(() => {
        if (isAuthorized) {
            fetchData();
        }
    }, [activeTab, isAuthorized]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginForm.username === 'arteco' && loginForm.password === '8926416s') {
            setIsAuthorized(true);
            localStorage.setItem('admin_auth', 'true');
            setAuthError('');
        } else {
            setAuthError('Неверный логин или пароль');
        }
    };

    const handleLogout = () => {
        setIsAuthorized(false);
        localStorage.removeItem('admin_auth');
    };

    const fetchData = async () => {
        setLoading(true);
        if (activeTab === 'articles') {
            const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
            setArticles(data || []);
        } else if (activeTab === 'projects') {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .neq('type', 'catalog')
                .order('created_at', { ascending: false });
            setProjects(data || []);
        } else if (activeTab === 'catalog') {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .eq('type', 'catalog')
                .order('created_at', { ascending: false });
            setCatalogItems(data || []);
        }
        setLoading(false);
    };

    const generateSlug = (text) => {
        return (text || '')
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-а-яА-ЯёЁ]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
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
        } else if (activeTab === 'projects') {
            if (item) {
                setEditingItem(item);
                setProjectForm({
                    name: item.name || '',
                    slug: item.slug || '',
                    desc: item.desc || '',
                    result: item.result || '',
                    images: item.images || [],
                    type: 'portfolio',
                    details: (item.details && item.details.length > 0) ? item.details : [
                        { label: 'Объект', value: '' },
                        { label: 'Материалы', value: '' },
                        { label: 'Фурнитура', value: '' }
                    ]
                });
            } else {
                setEditingItem(null);
                setProjectForm({
                    name: '', slug: '', desc: '', result: '', images: [], type: 'portfolio',
                    details: [
                        { label: 'Объект', value: '' },
                        { label: 'Материалы', value: '' },
                        { label: 'Фурнитура', value: '' }
                    ]
                });
            }
        } else if (activeTab === 'catalog') {
            if (item) {
                setEditingItem(item);
                setCatalogForm({
                    name: item.name || '',
                    slug: item.slug || '',
                    category: item.category || 'kitchens',
                    desc: item.desc || '',
                    result: item.result || '',
                    images: item.images || [],
                    type: 'catalog',
                    details: item.details || []
                });
            } else {
                setEditingItem(null);
                setCatalogForm({
                    name: '', slug: '', category: 'kitchens', desc: '', result: '', images: [], type: 'catalog',
                    details: []
                });
            }
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setSaveError(null);
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
        } else if (formType === 'project') {
            setProjectForm(prev => {
                const updated = { ...prev, [name]: value };
                if (name === 'name' && !editingItem) {
                    updated.slug = generateSlug(value);
                }
                return updated;
            });
        } else if (formType === 'catalog') {
            setCatalogForm(prev => {
                const updated = { ...prev, [name]: value };
                if (name === 'name' && !editingItem) {
                    updated.slug = generateSlug(value);
                }
                return updated;
            });
        }
    };

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...projectForm.details];
        updatedDetails[index][field] = value;
        setProjectForm(prev => ({ ...prev, details: updatedDetails }));
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
                alert(`Ошибка загрузки: ${uploadError.message}`);
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
        } else if (activeTab === 'projects') {
            setProjectForm(prev => ({
                ...prev,
                images: [...prev.images, ...newUrls]
            }));
        } else if (activeTab === 'catalog') {
            setCatalogForm(prev => ({
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
        } else if (activeTab === 'projects') {
            setProjectForm(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== indexOrTag)
            }));
        } else if (activeTab === 'catalog') {
            setCatalogForm(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== indexOrTag)
            }));
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSaveError(null);
        const table = activeTab === 'articles' ? 'articles' : 'projects';
        
        try {
            let payload = {};
            
            if (activeTab === 'articles') {
                payload = {
                    title: articleForm.title,
                    slug: generateSlug(articleForm.slug || articleForm.title),
                    category: articleForm.category,
                    date: articleForm.date || new Date().toLocaleDateString('ru-RU'),
                    img: articleForm.img || (Object.values(articleForm.images)[0] || ''),
                    excerpt: articleForm.excerpt,
                    content: articleForm.content,
                    images: articleForm.images || {}
                };
            } else if (activeTab === 'projects') {
                payload = {
                    name: projectForm.name,
                    slug: generateSlug(projectForm.slug || projectForm.name),
                    desc: projectForm.desc,
                    result: projectForm.result,
                    images: projectForm.images || [],
                    type: 'portfolio',
                    details: projectForm.details || []
                };
            } else if (activeTab === 'catalog') {
                payload = {
                    name: catalogForm.name,
                    slug: generateSlug(catalogForm.slug || catalogForm.name),
                    category: catalogForm.category || 'kitchens',
                    desc: catalogForm.desc,
                    result: catalogForm.result,
                    images: catalogForm.images || [],
                    type: 'catalog',
                    details: catalogForm.details || []
                };
            }

            console.log("SENDING TO", table, ":", payload);

            let result;
            if (editingItem) {
                result = await supabase.from(table).update(payload).eq('id', editingItem.id);
            } else {
                result = await supabase.from(table).insert([payload]);
            }

            if (result.error) {
                console.error("Supabase Error Context:", result.error);
                setSaveError(`Ошибка базы: ${result.error.message} (${result.error.code})`);
            } else {
                console.log("Success!");
                handleCloseModal();
                fetchData();
            }
        } catch (err) {
            console.error("Critical Exception:", err);
            setSaveError("Критическая ошибка. Подробности в консоли.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setDeleteConfirmId(id);
    };

    const confirmDelete = async () => {
        if (!deleteConfirmId) return;
        const id = deleteConfirmId;
        setDeleteConfirmId(null);
        setLoading(true);
        const table = activeTab === 'articles' ? 'articles' : 'projects';
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) {
            console.error("Delete error:", error);
            setSaveError("Ошибка удаления: " + error.message);
        }
        fetchData();
    };

    const insertToTextarea = (text) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const current = articleForm.content;
        const updated = current.substring(0, start) + text + current.substring(end);
        setArticleForm({ ...articleForm, content: updated });
    };

    const renderPreview = () => {
        if (!articleForm.content) return <p style={{ color: '#666' }}>Контент статьи пуст...</p>;
        return articleForm.content.split('\n').map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={idx} />;
            if (trimmed.startsWith('###')) return <h3 key={idx}>{trimmed.replace('###', '').trim()}</h3>;
            if (trimmed.startsWith('-')) return <li key={idx}>{trimmed.replace('-', '').trim()}</li>;
            const imgKeyMatch = trimmed.match(/^\[?\[?(IMG\d+)\]?\]?$/);
            if (imgKeyMatch && articleForm.images && articleForm.images[imgKeyMatch[1]]) {
                return (
                    <div key={idx} className="preview-img-wrap">
                        <img src={articleForm.images[imgKeyMatch[1]]} alt="preview" />
                    </div>
                );
            }
            return <p key={idx}>{trimmed}</p>;
        });
    };

    if (!isAuthorized) {
        return (
            <div className="admin-login-screen">
                <form className="login-box" onSubmit={handleLogin}>
                    <div className="login-logo">ARTECO</div>
                    <h2>Вход в панель управления</h2>
                    <div className="form-group">
                        <label>Логин</label>
                        <input 
                            type="text" 
                            value={loginForm.username} 
                            onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input 
                            type="password" 
                            value={loginForm.password} 
                            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} 
                            required 
                        />
                    </div>
                    {authError && <p className="auth-error-msg">{authError}</p>}
                    <button type="submit" className="login-btn">Войти</button>
                    <a href="/" className="back-to-site">На главную сайта</a>
                </form>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="container">
                <div className="admin-top-bar">
                    <div className="admin-logo-small">ARTECO Admin</div>
                    <button className="logout-link" onClick={handleLogout}>Выйти</button>
                </div>
                <div className="admin-tabs">
                    <button className={activeTab === 'articles' ? 'active' : ''} onClick={() => setActiveTab('articles')}>Статьи</button>
                    <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>Портфолио</button>
                    <button className={activeTab === 'catalog' ? 'active' : ''} onClick={() => setActiveTab('catalog')}>Каталог</button>
                </div>

                <div className="admin-header">
                    <h1 className="admin-title">
                        {activeTab === 'articles' ? 'Управление статьями' : 
                         activeTab === 'projects' ? 'Управление портфолио' : 'Управление каталогом'}
                    </h1>
                    <button className="admin-add-btn" onClick={() => handleOpenModal()}>
                        + {activeTab === 'articles' ? 'Добавить статью' : 
                           activeTab === 'projects' ? 'Добавить проект' : 'Добавить в каталог'}
                    </button>
                </div>

                <div className="admin-list">
                    {loading && !isModalOpen ? (
                        <div className="admin-loading">Загрузка данных...</div>
                    ) : (
                        (activeTab === 'articles' ? articles : 
                         activeTab === 'projects' ? projects : catalogItems).map(item => (
                            <div key={item.id} className="admin-item-card">
                                <div className="admin-item-preview" style={{ backgroundImage: `url(${item.img || (item.images && item.images[0])})` }}>
                                    {!item.img && !(item.images && item.images[0]) && <div style={{ padding: '20px', color: '#666' }}>Нет фото</div>}
                                </div>
                                <div className="admin-item-info">
                                    <h3>{item.title || item.name}</h3>
                                    <p>URL: /{item.slug}</p>
                                    {activeTab === 'catalog' && <p>Категория: <strong>{item.category}</strong></p>}
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
                            <h2>
                                {editingItem ? 'Редактировать' : 'Добавить'} / 
                                {activeTab === 'articles' ? ' Статья' : 
                                 activeTab === 'projects' ? ' Портфолио' : ' Каталог'}
                            </h2>
                            <button className="close-btn" onClick={handleCloseModal}>✕</button>
                        </div>

                        <form onSubmit={handleSave} className="admin-editor-form">
                            <div className="editor-columns">
                                <div className="editor-main">
                                    {activeTab === 'articles' ? (
                                        <div className="article-editor-split">
                                            <div className="editor-form-pane">
                                                <div className="form-group">
                                                    <label>Заголовок</label>
                                                    <input type="text" name="title" value={articleForm.title} onChange={(e) => handleInputChange(e, 'article')} required />
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group"><label>Slug</label><input type="text" name="slug" value={articleForm.slug} onChange={(e) => handleInputChange(e, 'article')} required /></div>
                                                    <div className="form-group"><label>Категория</label><input type="text" name="category" value={articleForm.category} onChange={(e) => handleInputChange(e, 'article')} /></div>
                                                </div>
                                                <div className="article-toolbar">
                                                    <button type="button" onClick={() => insertToTextarea('### ')}>H3</button>
                                                    <button type="button" onClick={() => insertToTextarea('- ')}>List</button>
                                                    <button type="button" onClick={() => insertToTextarea('\nIMG1\n')}>IMG1</button>
                                                </div>
                                                <div className="form-group">
                                                    <label>Основной контент</label>
                                                    <textarea ref={textareaRef} name="content" value={articleForm.content} onChange={(e) => handleInputChange(e, 'article')} className="tall-textarea" />
                                                </div>
                                            </div>
                                            <div className="editor-preview-pane"><label>Предпросмотр:</label><div className="article-preview-content">{renderPreview()}</div></div>
                                        </div>
                                    ) : activeTab === 'projects' ? (
                                        <>
                                            <div className="form-group"><label>Название проекта</label><input type="text" name="name" value={projectForm.name} onChange={(e) => handleInputChange(e, 'project')} required /></div>
                                            <div className="form-group"><label>Slug</label><input type="text" name="slug" value={projectForm.slug} onChange={(e) => handleInputChange(e, 'project')} required /></div>
                                            <div className="form-group"><label>Описание (сверху)</label><textarea name="desc" value={projectForm.desc} onChange={(e) => handleInputChange(e, 'project')} className="mid-textarea" /></div>
                                            <div className="form-group"><label>Результат (снизу)</label><textarea name="result" value={projectForm.result} onChange={(e) => handleInputChange(e, 'project')} className="mid-textarea" placeholder="Результат — мебель, которая выглядит дорого..." /></div>
                                            <div className="project-details-editor">
                                                <h3>Характеристики</h3>
                                                {projectForm.details.map((d, i) => (
                                                    <div key={i} className="detail-row">
                                                        <input value={d.label} onChange={(e) => handleDetailChange(i, 'label', e.target.value)} />
                                                        <input value={d.value} onChange={(e) => handleDetailChange(i, 'value', e.target.value)} />
                                                        <button type="button" onClick={() => removeDetail(i)}>✕</button>
                                                    </div>
                                                ))}
                                                <button type="button" className="add-detail-btn" onClick={addDetail}>+ Добавить</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-group"><label>Название для каталога</label><input type="text" name="name" value={catalogForm.name} onChange={(e) => handleInputChange(e, 'catalog')} required /></div>
                                            <div className="form-group">
                                                <label>Категория</label>
                                                <select name="category" value={catalogForm.category} onChange={(e) => handleInputChange(e, 'catalog')} className="admin-select">
                                                    <option value="kitchens">Кухни</option>
                                                    <option value="wardrobes">Шкафы</option>
                                                    <option value="cabinet">Кабинеты</option>
                                                    <option value="shelves">Стеллажи</option>
                                                    <option value="panels">Стеновые панели</option>
                                                    <option value="bathrooms">Санузлы</option>
                                                </select>
                                            </div>
                                            <div className="form-group"><label>Slug</label><input type="text" name="slug" value={catalogForm.slug} onChange={(e) => handleInputChange(e, 'catalog')} required /></div>
                                            <div className="form-group"><label>Описание (сверху)</label><textarea name="desc" value={catalogForm.desc} onChange={(e) => handleInputChange(e, 'catalog')} className="mid-textarea" /></div>
                                            <div className="form-group"><label>Результат (снизу)</label><textarea name="result" value={catalogForm.result} onChange={(e) => handleInputChange(e, 'catalog')} className="mid-textarea" placeholder="Результат — мебель, которая выглядит дорого..." /></div>
                                        </>
                                    )}
                                </div>
                                <div className="editor-sidebar">
                                    <button type="submit" className="save-btn" disabled={loading || uploading}>
                                        {loading ? '...' : (editingItem ? 'Сохранить изменения' : 'Опубликовать')}
                                    </button>
                                    
                                    {saveError && (
                                        <div className="admin-status-error">
                                            {saveError}
                                        </div>
                                    )}

                                    <div className="image-manager">
                                        <h3>Фото</h3>
                                        <div className="upload-box" onClick={() => fileInputRef.current.click()}>{uploading ? '...' : 'Загрузить'}<input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload} multiple accept="image/*" /></div>
                                        <div className="admin-image-grid">
                                            {activeTab === 'articles' ? (
                                                Object.entries(articleForm.images).map(([k, v]) => <div key={k} className="admin-thumb"><img src={v} /><button type="button" className="remove-btn" onClick={() => removeImage(k)}>✕</button></div>)
                                            ) : activeTab === 'projects' ? (
                                                projectForm.images.map((v, i) => <div key={i} className="admin-thumb"><img src={v} /><button type="button" className="remove-btn" onClick={() => removeImage(i)}>✕</button></div>)
                                            ) : (
                                                catalogForm.images.map((v, i) => <div key={i} className="admin-thumb"><img src={v} /><button type="button" className="remove-btn" onClick={() => removeImage(i)}>✕</button></div>)
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {deleteConfirmId && (
                <div className="admin-modal-overlay prompt">
                    <div className="admin-modal prompt-modal">
                        <h3>Удалить этот элемент?</h3>
                        <p>Это действие нельзя будет отменить.</p>
                        <div className="prompt-actions">
                            <button className="confirm-btn" onClick={confirmDelete}>Да, удалить</button>
                            <button className="cancel-btn" onClick={() => setDeleteConfirmId(null)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
