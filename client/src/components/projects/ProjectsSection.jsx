import { useState, useEffect, useCallback } from 'react';
import { fetchProjects } from '../../api/api';
import ProjectCard from './ProjectCard';
import { AlertCircle, RefreshCw } from 'lucide-react';
import './Projects.css';

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchProjects();
      // res.data corresponds to the JSON structure from projectController.js
      setProjects(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">
            A selection of full-stack web applications and engineering projects.
          </p>
        </div>

        {/* 1. Loading Skeleton State */}
        {loading && (
          <div className="projects-grid" aria-label="Loading projects">
            {[1, 2, 3].map((item) => (
              <div key={item} className="skeleton-card">
                <div className="skeleton-image skeleton-pulse" />
                <div className="skeleton-content">
                  <div className="skeleton-title skeleton-pulse" />
                  <div className="skeleton-text skeleton-pulse" />
                  <div className="skeleton-text short skeleton-pulse" />
                  <div className="skeleton-tags">
                    <div className="skeleton-tag skeleton-pulse" />
                    <div className="skeleton-tag skeleton-pulse" />
                    <div className="skeleton-tag skeleton-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Error State */}
        {!loading && error && (
          <div className="error-box">
            <AlertCircle className="error-icon" size={32} />
            <p className="error-message">{error}</p>
            <button type="button" onClick={loadProjects} className="retry-button">
              <RefreshCw size={16} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* 3. Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="empty-box">
            <p>No projects found. Add some to your database via the API!</p>
          </div>
        )}

        {/* 4. Data Render */}
        {!loading && !error && projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project._id || project.title} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}