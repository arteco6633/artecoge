import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './FinalForm.css';
import bgImage from '../../assets/hero_background.png';

const FinalForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [country, setCountry] = useState('ge');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code) setCountry(data.country_code.toLowerCase());
      })
      .catch(() => {});
  }, []);

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
          _subject: "Заявка с сайта ARTECO (подвал)",
          source: window.location.href
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '' });
      } else {
        alert('Ошибка при отправке. Пожалуйста, свяжитесь с нами напрямую.');
      }
    } catch (error) {
      alert('Ошибка соединения. Проверьте интернет.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="final-form" id="contacts">
      <div className="container">
        <div className="ff-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="ff-overlay"></div>
          
          <div className="ff-content-grid">
            {/* Left Box */}
            <div className="ff-info">
              <span className="ff-label">/Контакты</span>
              <h2 className="ff-title">
              Обсудим ваш <span className="text-orange-italic">проект</span> и скажем честно — подходим ли мы вам
              </h2>
              
              <div className="ff-contacts">
                <div className="ff-contact-block">
                  <span className="ff-contact-label">Связаться в мессенджерах:</span>
                  <div style={{display:'flex', gap:'15px', marginTop:'10px'}}>
                    <a href="https://wa.me/79651468409" target="_blank" rel="noopener noreferrer" className="ff-contact-value">WhatsApp</a>
                    <a href="https://t.me/arteco_sale" target="_blank" rel="noopener noreferrer" className="ff-contact-value">Telegram</a>
                  </div>
                </div>
                
                <div className="ff-contact-block">
                  <span className="ff-contact-label">Основной телефон:</span>
                  <a href="tel:+995591088478" className="ff-contact-value">+995 591 088 478</a>
                </div>
              </div>
              
              <div className="ff-socials-row">
                <span className="ff-social-label">Соц сети:</span>
                <div className="ff-social-pill">
                  <a href="https://wa.me/79651468409" target="_blank" rel="noopener noreferrer" className="social-icon" title="WhatsApp">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#000000">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  
                  <a href="https://t.me/arteco_sale" target="_blank" rel="noopener noreferrer" className="social-icon" title="Telegram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.305-.346-.11l-6.4 4.024-2.76-.86c-.6-.185-.615-.595.125-.89l10.73-4.133c.5-.186.953.11.831.91z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Form Box */}
            <div className="ff-form-box">
              {isSubmitted ? (
                <div className="ff-success-screen">
                  <div className="success-icon-wrap" style={{ marginBottom: '20px' }}>
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="ff-form-title">Заявка отправлена!</h3>
                  <p className="ff-form-subtitle">Спасибо! Мы получили ваши данные и свяжемся с вами в ближайшее время.</p>
                  <button className="ff-submit-btn" onClick={() => setIsSubmitted(false)}>Отправить ещё одну</button>
                </div>
              ) : (
                <>
                  <h3 className="ff-form-title">Бесплатная консультация специалиста</h3>
                  <p className="ff-form-subtitle">Заполните свои данные ниже чтобы мы могли связаться и обсудить все детали с Вами</p>
                  
                  <form className="ff-form" onSubmit={handleSubmit}>
                    <input 
                      type="text" 
                      placeholder="Ваше имя" 
                      required 
                      className="ff-input" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    
                    <div className="ff-phone-selector">
                      <PhoneInput
                        country={country}
                        preferredCountries={['ge', 'ru', 'by', 'kz', 'am', 'az', 'uz', 'kg', 'tj', 'md']}
                        value={formData.phone}
                        onChange={phone => setFormData({...formData, phone})}
                        inputClass="ff-phone-input-field"
                        containerClass="ff-phone-container"
                        buttonClass="ff-phone-button"
                        dropdownClass="ff-phone-dropdown"
                        placeholder="(000) 000-00-00"
                        enableSearch={true}
                        searchPlaceholder="Поиск..."
                      />
                    </div>
                    
                    <label className="ff-checkbox-label">
                      <input type="checkbox" required className="ff-checkbox" />
                      <span className="ff-checkbox-text">
                        Я даю согласие ARTECO (ООО «АРТЕКО»), адрес: Тбилиси, ул. Чавчавадзе 17/4 на обработку моих персональных данных в целях связи со мной, предоставления консультаций, оказания услуг в соответствии с Политикой конфиденциальности.
                      </span>
                    </label>
                    
                    <label className="ff-checkbox-label">
                      <input type="checkbox" className="ff-checkbox" />
                      <span className="ff-checkbox-text">
                        Я соглашаюсь на получение информационных и рекламных сообщений о товарах, услугах, включая рассылки по телефону, электронной почте и в мессенджерах.
                      </span>
                    </label>
                    
                    <button 
                      type="submit" 
                      className="ff-submit-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Отправка..." : "Отправить"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalForm;
