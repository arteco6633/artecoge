import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './ImageLightbox.css';

const ImageLightbox = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>
        <X size={40} />
      </button>
      
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-arrow lightbox-prev" onClick={prev}>
          <ChevronLeft size={32} />
        </button>
        
        <div className="lightbox-image-container">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="lightbox-image" />
          <div className="lightbox-counter">{currentIndex + 1} / {images.length}</div>
        </div>

        <button className="lightbox-arrow lightbox-next" onClick={next}>
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="lightbox-thumbnails">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`lightbox-thumb ${idx === currentIndex ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageLightbox;
