// src/components/Contact.js
import React from 'react';
import './Contact.css';

const CONTACT_LINKS = [
  {
    icon: <EmailIcon />,
    label: 'Email',
    value: 'wialbertusivan@gmail.com',
    href: 'mailto:wialbertusivan@gmail.com',
  },
  {
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    value: 'albertus-ivan-wijaya',
    href: 'https://www.linkedin.com/in/albertus-ivan-wijaya-7b2219274/',
  },
  {
    icon: <GitHubIcon />,
    label: 'GitHub',
    value: 'Ivan-web-source',
    href: 'https://github.com/Ivan-web-source',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <div className="section-label visible">Contact</div>
        <h2 className="section-title visible">
          Let's <em>connect</em>
        </h2>

        <p className="contact__intro">
          Whether you want to discuss a project, share ideas about technology,
          or just grab coffee and chat — I'd love to hear from you!
        </p>

        <div className="contact__cards">
          {CONTACT_LINKS.map(({ icon, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-card__icon">{icon}</div>
              <div className="contact-card__text">
                <span className="contact-card__label">{label}</span>
                <span className="contact-card__value">{value}</span>
              </div>
              <div className="contact-card__arrow">→</div>
            </a>
          ))}
        </div>

        <p className="contact__availability">
          <span className="availability-dot" />
          Available for internships &amp; co-op opportunities
        </p>
      </div>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Albertus Ivan Wijaya ·{' '}
          <a href="https://github.com/Ivan-web-source" target="_blank" rel="noreferrer">
            Built with React
          </a>
        </p>
      </footer>
    </section>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <polyline points="22,4 12,13 2,4" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}
