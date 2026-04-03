import React, { useState } from 'react';
import './Partners.css';
import placeholderImage1 from '../../assets/catalog_kitchen.png';
import placeholderImage2 from '../../assets/catalog_storage.png';

const tabsData = [
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
    id: 'corporate',
    label: 'Корпоративные проекты',
    subtitle: '/Для корпоративных клиентов',
    titleMain: 'Серийная мебель для коммерческих проектов',
    titleGray: 'с контролем сроков и качества',
    cards: [
      {
        id: 1,
        image: placeholderImage1,
        title: 'Где бизнес чаще всего теряет время и деньги',
        text: 'При работе с мебелью для ресторанов и коммерческих пространств проблемы чаще всего возникают на этапе масштабирования: одна партия отличается от другой, сроки «плывут», а подрядчики не готовы работать с объёмами и ответственностью.',
        buttonLabel: 'Запросить коммерческое предложение',
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
  const [activeTabId, setActiveTabId] = useState('designers');
  const activeData = tabsData.find(t => t.id === activeTabId);

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

            <div className="partners-title-block">
              <span className="small-label-partners">{activeData.subtitle}</span>
              <h2 className="partners-main-title">
                {activeData.titleMain}{' '}
                <span className="text-gray">{activeData.titleGray}</span>
              </h2>
            </div>
            
            <div className="partners-cta-wrap">
              <a href="#catalog" className="btn-primary-orange">
                Перейти в каталог 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginLeft: '8px', marginBottom: '-2px'}}>
                  <line x1="7" y1="7" x2="17" y2="17"></line>
                  <polyline points="17 7 17 17 7 17"></polyline>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="partners-right-custom">
            
            {/* Tall Card (Index 0) */}
            <div className="partner-card card-tall" style={{ backgroundImage: `url(${activeData.cards[0].image})` }}>
              <div className="partner-card-overlay"></div>
              <div className="partner-card-content">
                <div className="pc-top-area">
                  {activeData.cards[0].title && <h3 className="pc-title">{activeData.cards[0].title}</h3>}
                  <p className={`pc-text ${!activeData.cards[0].title ? 'pc-text-large' : ''}`}>{activeData.cards[0].text}</p>
                  
                  {activeData.cards[0].buttonLabel && activeData.cards[0].isLink && (
                    <a href="#contact" className="pc-link">
                      {activeData.cards[0].buttonLabel} 
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginLeft: '8px' }}>
                        <circle cx="12" cy="12" r="10" fill="white"></circle>
                        <polyline points="12 16 16 12 12 8" stroke="#121212" strokeWidth="2" fill="none"></polyline>
                        <line x1="8" y1="12" x2="16" y2="12" stroke="#121212" strokeWidth="2"></line>
                      </svg>
                    </a>
                  )}
                </div>
                
                {activeData.cards[0].buttonLabel && !activeData.cards[0].isLink && (
                  <div className="pc-bottom-area">
                    <button className="pc-btn-white">{activeData.cards[0].buttonLabel}</button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column with Short Card and Arrows */}
            <div className="partner-card-col-right">
              <div className="partner-card card-short" style={{ backgroundImage: `url(${activeData.cards[1].image})` }}>
                <div className="partner-card-overlay right-overlay"></div>
                <div className="partner-card-content">
                  <div className="pc-top-area">
                    {activeData.cards[1].title && <h3 className="pc-title">{activeData.cards[1].title}</h3>}
                    <p className={`pc-text ${!activeData.cards[1].title ? 'pc-text-large' : ''}`}>{activeData.cards[1].text}</p>
                    
                    {activeData.cards[1].buttonLabel && activeData.cards[1].isLink && (
                      <a href="#contact" className="pc-link">
                        {activeData.cards[1].buttonLabel} 
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginLeft: '8px' }}>
                          <circle cx="12" cy="12" r="10" fill="white"></circle>
                          <polyline points="12 16 16 12 12 8" stroke="#121212" strokeWidth="2" fill="none"></polyline>
                          <line x1="8" y1="12" x2="16" y2="12" stroke="#121212" strokeWidth="2"></line>
                        </svg>
                      </a>
                    )}
                  </div>
                  
                  {activeData.cards[1].buttonLabel && !activeData.cards[1].isLink && (
                    <div className="pc-bottom-area">
                      <button className="pc-btn-white">{activeData.cards[1].buttonLabel}</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Arrows */}
              <div className="partners-arrows">
                <button className="part-arrow-btn dark-ar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button className="part-arrow-btn white-ar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Partners;
