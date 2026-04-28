import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Projects.css';
import { useLang } from '../../i18n/context';

const Projects = ({ isMinimal = false }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLang();
  const p = t.projects;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const containerVariants = {};
  const itemVariants = {};

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        {!isMinimal && (
          <div className="projects-header">
            <span className="small-label">{p.label}</span>
            <div className="projects-header-grid">
              <h2 className="projects-title">
                {p.title} <span className="text-gray">{p.titleGray}</span>
              </h2>
              <p className="projects-desc">{p.subtitle}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div style={{color:'#666', textAlign:'center', padding:'50px'}}>{p.loading}</div>
        ) : (
          <motion.div
            className="projects-grid"
            variants={containerVariants}
          >
            {projects.length === 0 ? (
              <p style={{color:'#666', gridColumn:'span 3', textAlign:'center'}}>{p.empty}</p>
            ) : (
              projects.map(proj => (
                <motion.div
                  key={proj.id}
                  variants={itemVariants}
                  className="project-card"
                  onClick={() => navigate(`/project/${proj.slug}`)}
                >
                  <div className="project-card-inner">
                    {proj.images && proj.images.length > 0 ? (
                      <img src={proj.images[0]} alt={proj.name} className="project-card-img" />
                    ) : (
                      <div className="project-card-img-placeholder"></div>
                    )}
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
