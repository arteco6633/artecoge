import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useModal } from '../../ModalContext';
import './Partners.css';
import placeholderImage1 from '../../assets/catalog_kitchen.png';
import placeholderImage2 from '../../assets/catalog_storage.png';

const tabsData = [
  {
    id: 'private',
    label: 'Частным клиентам',
    subtitle: '/Для частных клиентов',
    titleMain: 'Мебель, которая завершает ремонт,',
    titleGray: 'а не превращает его в бесконечный процесс',
    cards: [
      {
        id: 1,
        image: placeholderImage1,
        title: 'Почему мебель — самый рискованный этап ремонта',
        text: 'Именно на мебели чаще всего ломается весь ремонт: подрядчики пропадают, сроки сдвигаются, размеры не совпадают, а результат отличается от ожиданий. Ошибка на этом этапе стоит дороже всего — по деньгам, времени и нервам.',
        buttonLabel: 'Обсудить проект',
        isLink: false
      },
      {
        id: 2,
        image: placeholderImage2,
        title: '',
        text: 'Когда вы делаете ремонт, мебель — самый рискованный этап. Ошибки в размерах, срывы сроков и несоответствие ожиданиям могут перечеркнуть месяцы работы и вложенные деньги. Мы берём на себя мебельную часть под ключ, чтобы вы получили результат без стресса и сюрпризов.',
        buttonLabel: '',
        isLink: false
      }
    ]
  },
  {
    id: 'designers',
    label: 'Дизайнерам',
    subtitle: '/Для дизайнеров интерьеров',
    titleMain: 'Мебельный партнёр для дизайнеров,',
    titleGray: 'которые ценят репутацию',
    cards: [
      {
        id: 1,
        image: placeholderImage1,
        title: 'Пробное изделие бесплатно',
        text: 'В рамках затрат до 150 000 ₽ — чтобы вы могли убедиться в качестве, точности исполнения и подходе к работе до старта большого проекта.',
        buttonLabel: 'Стать партнером',
        isLink: false
      },
      {
        id: 2,
        image: placeholderImage2,
        title: '',
        text: 'Мы работаем с дизайнерами как с партнёрами, а не как с посредниками. Берём на себя мебельную часть проекта под ключ, снимая с вас риски сроков, качества и коммуникации с подрядчиками — чтобы вы спокойно вели проекты и сдавали их без репутационных потерь.',
        buttonLabel: 'Подробнее',
        isLink: true
      }
    ]
  },
  {
    id: 'corporate',
    label: 'Коммерция',
    subtitle: '/Для корпоративных клиентов',
    titleMain: 'Серийная мебель для коммерческих проектов',
    titleGray: 'с контролем сроков и качества',
    cards: [
      {
        id: 1,
        image: placeholderImage1,
        title: 'Где бизнес чаще всего теряет время и деньги',
        text: 'При работе с мебелью для ресторанов и коммерческих пространств проблемы чаще всего возникают на этапе масштабирования: одна партия отличается от другой, сроки «плывут», а подрядчики не готовы работать с объёмами и ответственностью.',
        buttonLabel: 'Запросить предложение',
        isLink: false
      },
      {
        id: 2,
        image: placeholderImage2,
        title: '',
        text: 'В коммерческих проектах мебель — это не декор, а часть бизнес-процесса. Срыв сроков, нестабильное качество или несоответствие партий напрямую влияют на запуск объекта, выручку и репутацию. Мы выстраиваем мебельную часть проекта так, чтобы эти риски были под полным контролем.',
        buttonLabel: '',
        isLink: false
      }
    ]
  }
];

const Partners = () => {
  const [activeTabId, setActiveTabId] = useState('private');
  const activeData = tabsData.find(t => t.id === activeTabId);
  const { openModal } = useModal();

  const handleNextTab = () => {
    const currentIndex = tabsData.findIndex(t => t.id === activeTabId);
    const nextIndex = (currentIndex + 1) % tabsData.length;
    setActiveTabId(tabsData[nextIndex].id);
  };

  const handlePrevTab = () => {
    const currentIndex = tabsData.findIndex(t => t.id === activeTabId);
    const prevIndex = (currentIndex - 1 + tabsData.length) % tabsData.length;
    setActiveTabId(tabsData[prevIndex].id);
  };

  return (
    <section className="partners-section" id="partners">
      <div className="container">
        <div className="partners-grid-layout">
          
          {/* Left Column */}
          <div className="partners-left">
            <div className="partners-tabs-wrap">
              <div className="partners-tabs">
                {tabsData.map(tab => (
                  <button 
                    key={tab.id}
                    className={`partner-tab-btn ${activeTabId === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTabId(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            <p className="partners-intro-text">
              Независимо от масштаба и задачи проекта, мы берём на себя мебельную часть под ключ, чтобы вы получили результат без хаоса, переделок и лишних рисков.
            </p>

            <div className="partners-bottom-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTabId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="partners-title-block">
                    <span className="small-label-partners">{activeData.subtitle}</span>
                    <h2 className="partners-main-title">
                      {activeData.titleMain}{' '}
                      <span className="text-gray">{activeData.titleGray}</span>
                    </h2>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="partners-cta-wrap">
                <Link to="/catalog" className="btn-primary-orange">
                  Перейти в каталог 
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '8px', marginBottom: '-2px'}}>
                    <line x1="7" y1="7" x2="17" y2="17"></line>
                    <polyline points="17 7 17 17 7 17"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTabId}
              className="partners-right-custom"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              
              {/* Tall Card (Index 0) */}
              <motion.div 
                className="partner-card card-tall" 
                style={{ backgroundImage: `url(${activeData.cards[0].image})` }}
                initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                <div className="partner-card-overlay"></div>
                <div className="partner-card-content">
                  <div className="pc-top-area">
                    {activeData.cards[0].title && <h3 className="pc-title">{activeData.cards[0].title}</h3>}
                    <p className={`pc-text ${!activeData.cards[0].title ? 'pc-text-large' : ''}`}>{activeData.cards[0].text}</p>
                    
                    {activeData.cards[0].buttonLabel && activeData.cards[0].isLink && (
                      <button 
                        className="pc-link"
                        onClick={() => openModal(activeData.cards[0].buttonLabel, activeData.label)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        {activeData.cards[0].buttonLabel} 
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginLeft: '8px' }}>
                          <circle cx="12" cy="12" r="10" fill="white"></circle>
                          <polyline points="12 16 16 12 12 8" stroke="#121212" strokeWidth="2" fill="none"></polyline>
                          <line x1="8" y1="12" x2="16" y2="12" stroke="#121212" strokeWidth="2"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {activeData.cards[0].buttonLabel && !activeData.cards[0].isLink && (
                    <div className="pc-bottom-area">
                      <button 
                        className="pc-btn-white"
                        onClick={() => openModal(activeData.cards[0].buttonLabel, activeData.label)}
                      >
                        {activeData.cards[0].buttonLabel}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Right Column with Short Card and Arrows */}
              <div className="partner-card-col-right">
                <motion.div 
                  className="partner-card card-short" 
                  style={{ backgroundImage: `url(${activeData.cards[1].image})` }}
                  initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  <div className="partner-card-overlay right-overlay"></div>
                  <div className="partner-card-content">
                    <div className="pc-top-area">
                      {activeData.cards[1].title && <h3 className="pc-title">{activeData.cards[1].title}</h3>}
                      <p className={`pc-text ${!activeData.cards[1].title ? 'pc-text-large' : ''}`}>{activeData.cards[1].text}</p>
                      
                      {activeData.cards[1].buttonLabel && activeData.cards[1].isLink && (
                        <button 
                          className="pc-link"
                          onClick={() => openModal(activeData.cards[1].buttonLabel, activeData.label)}
                          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit' }}
                        >
                          {activeData.cards[1].buttonLabel} 
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginLeft: '8px' }}>
                            <circle cx="12" cy="12" r="10" fill="white"></circle>
                            <polyline points="12 16 16 12 12 8" stroke="#121212" strokeWidth="2" fill="none"></polyline>
                            <line x1="8" y1="12" x2="16" y2="12" stroke="#121212" strokeWidth="2"></line>
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    {activeData.cards[1].buttonLabel && !activeData.cards[1].isLink && (
                      <div className="pc-bottom-area">
                        <button 
                          className="pc-btn-white"
                          onClick={() => openModal(activeData.cards[1].buttonLabel, activeData.label)}
                        >
                          {activeData.cards[1].buttonLabel}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
                
                {/* Arrows */}
                <div className="partners-arrows">
                  <button className="part-arrow-btn dark-ar" onClick={handlePrevTab}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <button className="part-arrow-btn white-ar" onClick={handleNextTab}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Partners;
