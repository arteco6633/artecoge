import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import './Faq.css';
import { useLang } from '../../i18n/context';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useLang();

  return (
    <section className="faq" id="faq">
      <div className="container faq-container">
        <h2 className="section-title">{t.faq.title}</h2>
        <div className="faq-list">
          {t.faq.items.map((item, idx) => (
            <div
              key={idx}
              className={`faq-item ${openIndex === idx ? 'open' : ''}`}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className="faq-q">
                <span>{item.q}</span>
                {openIndex === idx ? <Minus size={20}/> : <Plus size={20}/>}
              </div>
              <div className="faq-a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
