import { ExternalLink, Code } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

export default function ProjectCard({ project }) {
  const {
    title,
    description,
    techStack = [],
    imageUrl,
    githubUrl,
    liveUrl,
    featured,
  } = project;

  return (
    <article className={`project-card ${featured ? 'featured-card' : ''}`}>
      {/* Thumbnail or Fallback */}
      <div className="project-image-wrapper">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="project-image" loading="lazy" />
        ) : (
          <div className="project-image-placeholder">
            <Code size={40} className="placeholder-icon" />
          </div>
        )}
        {featured && <span className="featured-badge">Featured</span>}
      </div>

      {/* Content */}
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>

        {/* Tech Stack Pills */}
        <div className="project-tech-list">
          {techStack.map((tech, index) => (
            <span key={index} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="project-links">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              aria-label={`View ${title} source code on GitHub`}
            >
              <FaGithub size={18} />
              <span>Source</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link primary-link"
              aria-label={`Visit live deployment of ${title}`}
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}