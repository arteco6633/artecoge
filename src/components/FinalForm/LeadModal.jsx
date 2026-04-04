import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './LeadModal.css';

const LeadModal = ({ isOpen, onClose, title = "Бесплатная консультация", subtitle = "Оставьте заявку, и мы свяжемся с вами в течение 30 минут" }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [country, setCountry] = useState('ge'); // Default to Georgia
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Basic country detection
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          if (data.country_code) setCountry(data.country_code.toLowerCase());
        })
        .catch(() => {}); // Fallback to 'ge'
    } else {
      document.body.style.overflow = 'unset';
      setIsSubmitted(false); // Reset when closed
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/arteco.one@mail.ru', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          _subject: `Новая заявка: ${title}`,
          source: window.location.href
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Что-то пошло не так. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.');
      }
    } catch (error) {
      alert('Ошибка соединения. Проверьте интернет и попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div className="modal-header">
          <h2 className="modal-title">{isSubmitted ? "Заявка отправлена!" : title}</h2>
          <p className="modal-subtitle">
            {isSubmitted 
              ? "Спасибо! Мы получили ваши данные и свяжемся с вами в ближайшее время." 
              : subtitle}
          </p>
        </div>

        {!isSubmitted ? (
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-input-group">
              <label className="modal-label">Ваше имя</label>
              <input 
                type="text" 
                placeholder="Иван Иванов" 
                required 
                className="modal-input"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="modal-input-group">
              <label className="modal-label">Телефон</label>
              <PhoneInput
                country={country}
                preferredCountries={['ge', 'ru', 'by', 'kz', 'am', 'az', 'uz', 'kg', 'tj', 'md']}
                value={formData.phone}
                onChange={phone => setFormData({...formData, phone})}
                inputClass="modal-phone-input"
                containerClass="modal-phone-container"
                buttonClass="modal-phone-button"
                dropdownClass="modal-phone-dropdown"
                enableSearch={true}
                searchPlaceholder="Поиск..."
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: false
                }}
                placeholder="(000) 000-00-00"
              />
            </div>
            <p className="modal-disclaimer">
              Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности и обработкой персональных данных
            </p>
            <button 
              type="submit" 
              className="modal-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </button>
          </form>
        ) : (
          <div className="modal-success-screen">
            <div className="success-icon-wrap">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <button className="modal-submit-btn" onClick={onClose} style={{ marginTop: '30px' }}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadModal;
