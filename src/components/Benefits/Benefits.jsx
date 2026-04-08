import React from 'react';
import './Benefits.css';

const benefitsList = [
  {
    id: 1,
    number: '01',
    title: 'Собственное производство',
    desc: 'Мы контролируем каждый этап изготовления нашей мебели на собственном высокотехнологичном производстве.'
  },
  {
    id: 2,
    number: '02',
    title: 'Проектный контроль',
    desc: 'Персональный менеджер проекта курирует ваш заказ от первых замеров до финального монтажа.'
  },
  {
    id: 3,
    number: '03',
    title: 'Профессиональный монтаж',
    desc: 'В нашем штате работают сертифицированные монтажники, гарантирующие идеальную сборку и сохранность интерьера.'
  },
  {
    id: 4,
    number: '04',
    title: 'Контроль качества',
    desc: 'Многоступенчатый контроль качества гарантирует безупречную работу механизмов и идеальную отделку.'
  }
];

const Benefits = () => {
  return (
    <section className="benefits" id="about">
      <div className="container">
        <h2 className="section-title">Почему выбирают ARTECO</h2>
        <div className="benefits-grid">
          {benefitsList.map(benefit => (
            <div className="benefit-card" key={benefit.id}>
              <div className="benefit-number">{benefit.number}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-desc">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
