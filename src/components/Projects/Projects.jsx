import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .or('type.eq.portfolio,type.is.null')
      .order('created_at', { ascending: false });
    
    setProjects(data || []);
    setLoading(false);
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="projects-header">
          <span className="small-label">/Реализованные проекты</span>
          <div className="projects-header-grid">
            <h2 className="projects-title">
              Проекты, которые доходят до конца <span className="text-gray">— без переделок, срывов сроков и потери качества</span>
            </h2>
            <p className="projects-desc">
              Каждый из этих проектов — результат полного контроля всех этапов производства и установки. Здесь нет демонстрационных работ, только реальные объекты и реальные задачи.
            </p>
          </div>
        </div>

        {loading ? (
            <div style={{color:'#666', textAlign:'center', padding:'50px'}}>Загрузка проектов...</div>
        ) : (
            <motion.div 
              className="projects-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
            {projects.length === 0 ? (
                <p style={{color:'#666', gridColumn:'span 3', textAlign:'center'}}>Проектов пока нет в базе.</p>
            ) : (
                projects.map(proj => (
                    <motion.div 
                      key={proj.id} 
                      variants={itemVariants}
                      className="project-card" 
                      onClick={() => navigate(`/project/${proj.slug}`)}
                    >
                    <div className="project-card-inner">
                        <img src={proj.images[0]} alt={proj.name} className="project-card-img" />
                        <div className="project-card-overlay">
                        <h3 className="pc-title">{proj.name}</h3>
                        <div className="pc-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </div>
                        </div>
                    </div>
                    </motion.div>
                ))
            )}
            </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
