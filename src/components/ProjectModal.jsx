import React, { useState } from 'react';
import './ProjectModal.css';

export default function ProjectModal({ project, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !project) return null;

  const images = project.images || [];
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose}>✕</button>

        {/* Image Carousel */}
        {images.length > 0 && (
          <div className="project-modal-carousel">
            <div className="carousel-main">
              <img
                src={images[currentImageIndex]}
                alt={`${project.title} ${currentImageIndex + 1}`}
                className="carousel-image"
              />
              {images.length > 1 && (
                <>
                  <button className="carousel-btn prev" onClick={prevImage}>‹</button>
                  <button className="carousel-btn next" onClick={nextImage}>›</button>
                  <div className="carousel-indicators">
                    {images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(idx)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="project-modal-body">
          <h2 className="project-modal-title">{project.title}</h2>

          <div className="project-modal-description">
            <p>{project.fullDescription}</p>
          </div>

          {/* Tech Stack */}
          <div className="project-modal-section">
            <h3 className="project-modal-section-title">Tech Stack</h3>
            <div className="project-modal-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="project-modal-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="project-modal-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link github-link">
                GitHub
              </a>
            )}
            {project.liveApp && (
              <a href={project.liveApp} target="_blank" rel="noopener noreferrer" className="project-link live-link">
                Live App
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link demo-link">
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
