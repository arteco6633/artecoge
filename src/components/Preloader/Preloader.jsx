import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate real assets loading progress
    const duration = 2400; // 2.4 seconds
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          // Small delay before fading out
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return next;
      });
    }, interval);

    // Disable scrolling when preloader is active
    document.body.style.overflow = 'hidden';

    return () => {
      clearInterval(timer);
      document.body.style.overflow = '';
    };
  }, []);

  // Characters for ARTECO
  const brandChars = "ARTECO".split("");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] }
          }}
        >
          <div className="preloader-content">
            <div className="brand-letters">
              {brandChars.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className="brand-char"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            
            <div className="preloader-progress-wrap">
              <motion.div 
                className="preloader-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
              <span className="preloader-percent">{Math.round(progress)}%</span>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.8 }}
              className="preloader-footer"
            >
              PREMIUM FURNITURE SOLUTIONS
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
