import React from 'react';
import './About.css';
import aboutImg from '../../assets/hero_background.png';

const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title">Наша философия</h2>
            <p className="about-desc">
              Мы не просто создаем мебель, мы формируем качественную среду для жизни. Каждый шкаф и кухня, созданные NOTIS, индивидуальны и подстроены под стиль жизни наших клиентов.
            </p>
            <p className="about-desc">
              Премиальные материалы, точная инженерия и продуманный дизайн. Так мы превращаем ваш дом в любимое место.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-num">10+</span>
                <span className="stat-label">Лет опыта</span>
              </div>
              <div className="stat">
                <span className="stat-num">500+</span>
                <span className="stat-label">Реализованных проектов</span>
              </div>
            </div>
            
            <div className="pt-8">
              <button className="btn-primary" style={{marginTop: '40px'}}>Стать партнером</button>
            </div>
          </div>
          <div className="about-image-wrapper">
             <img src={aboutImg} alt="NOTIS interior layout" className="about-image" />
          </div>
        </div>
      </div>
    </section>
  )
}
export default About;
