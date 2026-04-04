import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../ModalContext';
import './ProjectPage.css';
import kitchenImg from '../../assets/catalog_kitchen.png';
import storageImg from '../../assets/catalog_storage.png';
import heroImg from '../../assets/hero_background.png';

// Dummy data for projects
const projectsData = {
  "alia-kitchen": {
    name: "ЖК ALIA — КУХНЯ",
    desc: "Просторная светлая кухня, созданная для большой семьи. Мы использовали итальянский керамогранит для столешницы и шпонированные фасады из дуба. Скрытые системы хранения обеспечивают идеальный порядок.",
    details: [
      { label: "Стиль", value: "Минимализм" },
      { label: "Материалы", value: "Шпон дуба, МДФ эмаль, Керамогранит" },
      { label: "Фурнитура", value: "Blum (Австрия)" },
      { label: "Срок реализации", value: "45 дней" }
    ],
    images: [heroImg, kitchenImg, storageImg, kitchenImg, heroImg]
  },
  "premium-park-kitchen": {
    name: "ЖК PREMIUM PARK",
    desc: "Современная кухня с островом. Идеальное сочетание темных фасадов и теплой подсветки рабочих зон.",
    details: [
      { label: "Стиль", value: "Современный" },
      { label: "Материалы", value: "Fenix NTM, Кварцевый агломерат" },
      { label: "Фурнитура", value: "Hettich (Германия)" },
      { label: "Срок реализации", value: "40 дней" }
    ],
    images: [kitchenImg, storageImg, heroImg, storageImg]
  },
  "skyline-wardrobe": {
    name: "ЖК SKYLINE — ГАРДЕРОБ",
    desc: "Эргономичная гардеробная комната, где продумано каждое отделение: от брючниц до пантографов.",
    details: [
      { label: "Площадь", value: "12 кв.м." },
      { label: "Материалы", value: "ЛДСП Egger, Стекло с тонировкой" },
      { label: "Особенности", value: "Встроенная LED-подсветка с датчиком" }
    ],
    images: [storageImg, kitchenImg, heroImg, storageImg]
  },
  "home-proj-1": {
    name: "УЮТНАЯ МИНИМАЛИСТИЧНАЯ КУХНЯ",
    desc: "Проект кухни для молодой семьи, где главной задачей было сохранить максимум воздуха и света. Мы использовали скрытую фурнитуру и матовые фасады, которые легко мыть.",
    details: [
      { label: "Стиль", value: "Минимализм" },
      { label: "Материалы", value: "МДФ эмаль матовая, Искусственный камень" },
      { label: "Фурнитура", value: "Blum" }
    ],
    images: [kitchenImg, heroImg, storageImg, kitchenImg]
  },
  "home-proj-2": {
    name: "СОВРЕМЕННЫЙ ЧАСТНЫЙ ИНТЕРЬЕР",
    desc: "Комплексная меблировка загородного дома. От встроенных шкафов до деревянных стеновых панелей и кухни с островом. Единый стиль и идеальная подгонка под архитектуру.",
    details: [
      { label: "Площадь дома", value: "240 кв.м." },
      { label: "Материалы", value: "Шпон американского ореха, Fenix NTM" },
      { label: "Срок реализации", value: "3 месяца" }
    ],
    images: [heroImg, storageImg, kitchenImg, heroImg]
  },
  "home-proj-3": {
    name: "ПРОСТОРНАЯ ГАРДЕРОБНАЯ СИСТЕМА",
    desc: "Гардеробная комната площадью 18 квадратных метров, спроектированная как витрина любимых вещей. Многоуровневая встроенная подсветка, фасады из стекла с эффектом тонировки и шпонированные полки.",
    details: [
      { label: "Тип", value: "Открытая гардеробная" },
      { label: "Особенности", value: "LED подсветка каждой полки, Остров" },
      { label: "Фурнитура", value: "Vibo (Италия)" }
    ],
    images: [storageImg, kitchenImg, heroImg, storageImg]
  },
  "home-proj-4": {
    name: "ОФИСНОЕ ПРОСТРАНСТВО",
    desc: "Разработка и производство мебели для креативного агентства в Тбилиси. Изготовили столы для open-space сложной геометрии, акустические перегородки и мебель для переговорных комнат.",
    details: [
      { label: "Тип проекта", value: "B2B / Коммерция" },
      { label: "Материалы", value: "Фанера высшего сорта, HPL пластик" },
      { label: "Срок реализации", value: "45 дней" }
    ],
    images: [heroImg, kitchenImg, storageImg, heroImg]
  },
  "home-proj-5": {
    name: "КОММЕРЧЕСКАЯ ЗОНА РЕСЕПШН",
    desc: "Статусная стойка ресепшн для бутик-отеля. Использовали массив дуба в сочетании с латунью и натуральным камнем. Стойка спроектирована с учетом эргономики рабочих мест сотрудников.",
    details: [
      { label: "Материалы", value: "Массив дуба, Натуральный мрамор, Латунь" },
      { label: "Стиль", value: "Неоклассика / Модерн" }
    ],
    images: [storageImg, heroImg, kitchenImg, storageImg]
  },
  "home-proj-6": {
    name: "ПРЕМИАЛЬНЫЙ МЕБЕЛЬНЫЙ СЕТ",
    desc: "Эксклюзивный мебельный сет для гостиной: TV-зона, интегрированная система хранения и настенные панели с акустической подложкой. Сложная фрезеровка фасадов и интеграция умного дома.",
    details: [
      { label: "Объект", value: "Пентхаус" },
      { label: "Особенности", value: "Сложная фрезеровка, скрытая проводка" },
      { label: "Площадь покрытия", value: "35 кв.м." }
    ],
    images: [kitchenImg, storageImg, heroImg, kitchenImg]
  }
};

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  
  // Try to find the project, or use a default mock
  const project = projectsData[projectId] || {
    name: "ПРОЕКТ В РАЗРАБОТКЕ",
    desc: "Детальное описание этого проекта скоро появится здесь. Мы подготавливаем лучшие фотографии и технические особенности.",
    details: [
      { label: "Статус", value: "В процессе" },
      { label: "Материалы", value: "Премиальные" }
    ],
    images: [heroImg, storageImg, kitchenImg, heroImg]
  };

  // Get 'other projects' randomly or sequentially
  const otherProjectsFull = Object.entries(projectsData)
    .filter(([id, _]) => id !== projectId)
    .map(([id, data]) => ({ id, ...data }));
    
  // Show 2 other projects
  const otherProjects = otherProjectsFull.slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  return (
    <div className="project-page">
      <div className="container">
        <button className="pp-back-btn" onClick={() => navigate(-1)}>
          ← Назад в каталог
        </button>

        <div className="pp-header">
          <h1 className="pp-title">{project.name}</h1>
          <div className="pp-info">
            <p className="pp-desc">{project.desc}</p>
            <div className="pp-details">
              {project.details.map((item, idx) => (
                <div key={idx} className="pp-detail-item">
                  <span className="pp-detail-label">{item.label}</span>
                  <span className="pp-detail-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pp-gallery">
          {project.images.map((img, idx) => (
            <div 
              key={idx} 
              className={`pp-gallery-item ${idx === 0 ? 'pp-gallery-item--featured' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>

        {otherProjects.length > 0 && (
          <div className="pp-other-projects">
            <h2 className="pp-other-title">Смотрите также</h2>
            <div className="pp-other-grid">
              {otherProjects.map((other) => (
                <div 
                  key={other.id} 
                  className="pp-other-card" 
                  onClick={() => navigate(`/project/${other.id}`)}
                >
                  <div className="pp-other-img" style={{ backgroundImage: `url(${other.images[0]})` }}></div>
                  <div className="pp-other-info">
                    <h3 className="pp-other-name">{other.name}</h3>
                    <span className="pp-other-link">Перейти →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pp-cta" style={{ backgroundImage: `url(${heroImg})` }}>
          <h2 className="pp-cta-title">Понравился проект?</h2>
          <p className="pp-cta-desc">Оставьте заявку, и мы адаптируем подобное решение под ваши размеры и бюджет.</p>
          <button 
            className="btn-primary" 
            onClick={() => openModal("Обсудить проект", project.name)}
          >
            Обсудить мой проект
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
