import React from 'react';
import { useModal } from '../../ModalContext';
import './CtaAnchor.css';
import bgImage from '../../assets/catalog_storage.png';
import { useLang } from '../../i18n/context';

const CtaAnchor = () => {
  const { openModal } = useModal();
  const { t } = useLang();
  const c = t.cta;

  return (
    <section className="cta-anchor-section" id="contact">
      <div className="container">
        <div
          className="cta-bg-block"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="cta-overlay"></div>
          <div className="cta-content">
            <span className="cta-label">{c.label}</span>
            <h2 className="cta-title">
              {c.title1}<br/>
              {c.title2}
            </h2>
            <button
              className="cta-btn-white"
              onClick={() => openModal(c.modalTitle, c.modalDesc)}
            >
              {c.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaAnchor;
