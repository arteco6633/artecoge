import React, { createContext, useContext, useState, lazy, Suspense } from 'react';

const LeadModal = lazy(() => import('./components/FinalForm/LeadModal'));

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    subtitle: ''
  });

  const openModal = (title, subtitle) => {
    setModalState({
      isOpen: true,
      title: title || "Бесплатная консультация",
      subtitle: subtitle || "Оставьте заявку, и мы свяжемся с вами в течение 30 минут"
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      <Suspense fallback={null}>
        {modalState.isOpen && (
          <LeadModal 
            isOpen={modalState.isOpen} 
            onClose={closeModal} 
            title={modalState.title} 
            subtitle={modalState.subtitle} 
          />
        )}
      </Suspense>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
