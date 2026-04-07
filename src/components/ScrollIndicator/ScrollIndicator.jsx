import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="scroll-indicator-container desktop-only">
      <div className="scroll-track"></div>
      <motion.div 
        className="scroll-thumb" 
        style={{ scaleY }}
      />
    </div>
  );
};

export default ScrollIndicator;
