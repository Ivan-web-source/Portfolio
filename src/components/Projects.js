// src/components/Projects.js
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { PROJECTS } from '../data/projects';
import './Projects.css';

export default function Projects() {
  const [current, setCurrent]       = useState(0);
  const [videoModal, setVideoModal] = useState(null);
  const total = PROJECTS.length;

  const dragStartX  = useRef(null);
  const dragDelta   = useRef(0);
  const isDragging  = useRef(false);
  const hasDragged  = useRef(false);

  const goTo = useCallback((index) => {
    let next = index % total;
    if (next < 0) next += total;
    setCurrent(next);
  }, [total]);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  const onPointerDown = (e) => {
    // Don't hijack clicks on links/buttons
    if (e.target.closest('a, button')) return;
    isDragging.current  = true;
    hasDragged.current  = false;
    dragStartX.current  = e.clientX;
    dragDelta.current   = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    dragDelta.current = e.clientX - dragStartX.current;
    if (Math.abs(dragDelta.current) > 6) hasDragged.current = true;
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = dragDelta.current;
    if (delta < -55)      next();
    else if (delta > 55)  prev();
    dragDelta.current = 0;
  };

  return (
    <section id="projects" className="projects">
      <div className="projects__header">
        <div className="section-label">Projects</div>
        <h2 className="section-title">Things I've <em>built</em></h2>
        <p className="projects__hint">Drag, swipe or use arrows · loops continuously</p>
      </div>

      <div
        className="projects__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {PROJECTS.map((project, i) => {
          let offset = i - current;
          if (offset > total / 2)  offset -= total;
          if (offset < -total / 2) offset += total;
          if (Math.abs(offset) > 2) return null;

          return (
            <ProjectCard
              key={project.id}
              project={project}
              offset={offset}
              onCardClick={() => {
                if (hasDragged.current) return;
                if (offset !== 0) goTo(i);
              }}
              onDemoClick={() => {
                if (!hasDragged.current && offset === 0) setVideoModal(project);
              }}
              isDragging={isDragging}
              hasDragged={hasDragged}
            />
          );
        })}
      </div>

      <div className="projects__controls">
        <button className="ctrl-btn" onClick={prev} aria-label="Previous">
          <ChevronLeft />
        </button>
        <div className="ctrl-dots">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              className={`dot${i === current ? ' dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Project ${i + 1}`}
            />
          ))}
        </div>
        <button className="ctrl-btn" onClick={next} aria-label="Next">
          <ChevronRight />
        </button>
      </div>

      <p className="projects__counter">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>

      {videoModal && (
        <VideoModal project={videoModal} onClose={() => setVideoModal(null)} />
      )}
    </section>
  );
}

/* ── Project Card ── */
function ProjectCard({ project, offset, onCardClick, onDemoClick, hasDragged }) {
  const absOffset = Math.abs(offset);
  const isActive  = offset === 0;

  const x       = offset * 340;
  const scale   = absOffset === 0 ? 1 : absOffset === 1 ? 0.86 : 0.74;
  const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.55 : 0.25;
  const blur    = absOffset === 0 ? 0 : absOffset === 1 ? 3    : 6;
  const zIndex  = 10 - absOffset;

  // GitHub link handler — only navigate if user didn't drag
  const handleGithubClick = (e) => {
    if (hasDragged.current) {
      e.preventDefault();
      return;
    }
    // Allow normal navigation — do NOT stopPropagation so the browser follows the href
  };

  return (
    <div
      className={`project-card${isActive ? ' project-card--active' : ''}`}
      style={{
        transform: `translateX(${x}px) scale(${scale})`,
        opacity,
        filter:    blur > 0 ? `blur(${blur}px)` : 'none',
        zIndex,
        // Non-active cards: pointer-events none EXCEPT on links/buttons
        pointerEvents: isActive ? 'auto' : 'none',
        '--card-accent': project.accentColor,
        '--card-bg':     project.color,
        background:      project.color,
      }}
      onClick={onCardClick}
    >
      <div className="pc__top-bar" />
      <div className="pc__body">
        <div className="pc__meta">
          <span className="pc__year">{project.year}</span>
          <span className="pc__status" data-ongoing={project.status === 'Ongoing'}>
            {project.status}
          </span>
        </div>
        <h3 className="pc__title">{project.title}</h3>
        <p className="pc__subtitle">{project.subtitle}</p>
        <p className="pc__desc">{project.description}</p>
        <div className="pc__tech">
          {project.tech.map(t => <span key={t} className="pc__tag">{t}</span>)}
        </div>
        <div className="pc__actions">
          <button
            className="pc__demo-btn"
            onClick={(e) => { e.stopPropagation(); onDemoClick(); }}
          >
            <PlayIcon /> Watch Demo
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="pc__github-btn"
            onClick={handleGithubClick}
          >
            <GithubIcon /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Video Modal ── */
function VideoModal({ project, onClose }) {
  const getYtId = (u) => { const m = u.match(/(?:v=|youtu\.be\/)([^&?/]+)/); return m?.[1]; };
  const ytId = getYtId(project.demoUrl);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="video-modal" onClick={onClose}>
      <div className="video-modal__box" onClick={e => e.stopPropagation()}>
        <button className="video-modal__close" onClick={onClose}>✕</button>
        <div className="video-modal__title">{project.title}</div>
        <div className="video-modal__embed">
          {ytId
            ? <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Demo"
              />
            : <div className="video-modal__placeholder">Demo video coming soon</div>
          }
        </div>
      </div>
    </div>
  );
}

const ChevronLeft  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevronRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;
const PlayIcon     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const GithubIcon   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>;
