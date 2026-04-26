import React, { useState } from 'react';
import { useModal } from '../../ModalContext';
import { motion, AnimatePresence } from 'framer-motion';
import './HowWeWork.css';
import { useLang } from '../../i18n/context';

const HowWeWork = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { openModal } = useModal();
  const { t } = useLang();
  const hw = t.howWeWork;
  const steps = hw.steps;
  const current = steps[activeStep];

  const nextStep = () => setActiveStep(prev => (prev + 1) % steps.length);
  const prevStep = () => setActiveStep(prev => (prev === 0 ? steps.length - 1 : prev - 1));

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const revealProps = isMobile ? {} : {
    initial: { opacity: 0, y: 30, scale: 0.99, filter: 'blur(2px)' },
    whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.7, ease: 'easeOut' }
  };

  return (
    <motion.section
      className="how-we-work"
      id="how-we-work"
      {...revealProps}
    >
      <div className="container">
        <div className="work-grid">
          <div className="work-left">
            <span className="small-label">{hw.label}</span>

            <div className="work-nav">
              <span className="current-num">{current.num}</span>
              <div className="work-line">
                <div className="work-line-fill" style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}></div>
              </div>
              <div className="nums">
                {steps.map((s, idx) => (
                  <span
                    key={s.num}
                    className={idx === activeStep ? 'active-num' : 'inactive-num'}
                    onClick={() => setActiveStep(idx)}
                  >
                    {s.num}
                  </span>
                ))}
              </div>
            </div>

            <div className="step-content-box">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="step-content"
                >
                  <h3 className="step-title">{current.title}</h3>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="work-controls">
              <button className="arrow-btn" onClick={prevStep}>←</button>
              <button className="arrow-btn" onClick={nextStep}>→</button>
            </div>
          </div>

          <div className="work-right">
            <div className="work-image-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="work-image-inner"
                >
                  <img src="/images/work4.png" alt={`ARTECO - ${current.title}`} className="card-bg-img" />
                  <div className="work-card-content">
                    <div className="work-card-top">
                      <p className="card-desc-top">{current.desc}</p>
                    </div>
                    <div className="work-card-bottom">
                      <button
                        className="btn-light-solid"
                        onClick={() => openModal(hw.modalTitle, hw.modalDesc)}
                      >
                        {hw.discussButton}
                      </button>
                      <span className="giant-num">{current.num}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HowWeWork;
