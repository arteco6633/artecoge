import React, { useState } from 'react';
import { useModal } from '../../ModalContext';
import './HowWeWork.css';
import stepBg from '../../assets/hero_background.png';

const steps = [
  {
    id: 1, num: '01',
    title: 'Обсуждение задачи и фиксация договорённостей',
    desc: 'Мы погружаемся в ваш проект, обсуждаем задачи, объём работ и бюджет, после чего фиксируем ключевые решения и сроки. Без размытых формулировок и «потом разберёмся».',
    image: stepBg
  },
  {
    id: 2, num: '02',
    title: 'Создание проекта и инженерная проработка',
    desc: 'Проектируем мебель с учетом особенностей вашего помещения. Подбираем лучшие материалы и фурнитуру для обеспечения максимальной надежности.',
    image: stepBg
  },
  {
    id: 3, num: '03',
    title: 'Производство на собственной фабрике',
    desc: 'Изготавливаем все элементы на высокоточном оборудовании. Многоступенчатый контроль качества гарантирует идеальную подгонку деталей.',
    image: stepBg
  },
  {
    id: 4, num: '04',
    title: 'Установка и финальная сдача проекта',
    desc: 'Бережно доставляем мебель на объект. Монтажники собирают всё без зазоров, убирают за собой строительный мусор и сдают чистый результат.',
    image: stepBg
  }
];

const HowWeWork = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { openModal } = useModal();

  const nextStep = () => setActiveStep(prev => (prev + 1) % steps.length);
  const prevStep = () => setActiveStep(prev => (prev === 0 ? steps.length - 1 : prev - 1));

  const current = steps[activeStep];

  return (
    <section className="how-we-work">
      <div className="container">
        
        <div className="work-grid">
          <div className="work-left">
            <span className="small-label">/Как мы работаем</span>
            
            <div className="work-nav">
              <span className="current-num">{current.num}</span>
              <div className="work-line">
                <div className="work-line-fill" style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}></div>
              </div>
              <div className="nums">
                {steps.map((s, idx) => (
                  <span 
                    key={s.id} 
                    className={idx === activeStep ? 'active-num' : 'inactive-num'}
                    onClick={() => setActiveStep(idx)}
                  >
                    {s.num}
                  </span>
                ))}
              </div>
            </div>

            <h2 className="work-title anim-title" key={`title-${current.id}`}>{current.title}</h2>

            <div className="work-arrows">
              <button className="arrow-btn" onClick={prevStep}>←</button>
              <button className="arrow-btn" onClick={nextStep}>→</button>
            </div>
          </div>

          <div className="work-right">
            <div className="work-image-card anim-card" key={`card-${current.id}`} style={{ backgroundImage: `url(${current.image})` }}>
              <div className="work-card-content">
                <p className="anim-desc">{current.desc}</p>
                <div className="work-card-bottom">
                  <button 
                    className="btn-light-solid anim-btn"
                    onClick={() => openModal("Подобрать проект со специалистом", current.title)}
                  >
                    Подобрать проект со специалистом
                  </button>
                  <span className="giant-num anim-giant-num">{current.num}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
