import { Download, ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import './Hero.css';

export default function Hero() {
  return (
    <section id="about" className="hero-section">
      <div className="container hero-container">
        {/* Availability Badge */}
        <div className="hero-badge">
          <span className="pulse-dot" />
          <span>Available for full-time roles & freelance</span>
        </div>

        {/* Value Proposition Headline */}
        <h1 className="hero-title">
          Building Scalable, Full-Stack Web Apps with the{' '}
          <span className="text-gradient">MERN Stack</span>.
        </h1>

        {/* Subtitle / Pitch */}
        <p className="hero-subtitle">
          Hi, I&apos;m <span className="highlight-text">Ayush Yadav</span>. I bridge
          the gap between clean UI design and reliable backend architecture,
          specializing in React, Node.js, Express, and MongoDB.
        </p>

        {/* Action Buttons (CTAs) */}
        <div className="hero-cta-group">
          {/* Primary CTA - Scrolls to Projects */}
          <a href="#projects" className="btn btn-primary">
            <span>View My Work</span>
            <ArrowRight size={18} />
          </a>

          {/* Secondary CTA - Direct Resume Download / View */}
          {/* Option A: Drop your resume in client/public/resume.pdf */}
          <a
            href="https://drive.google.com/file/d/13MYNuvh0JnD3aVGYK1Ov0bARWIpViul5/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <Download size={18} />
            <span>View CV</span>
          </a>
        </div>

        {/* Social Proof & Direct Channels */}
        <div className="hero-socials">
          <span className="socials-label">Connect with me:</span>
          <div className="social-links">
            <a
              href="https://github.com/ayushyadav260704"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="GitHub Profile"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://linkedin.com/in/ayush-yadav-440383350"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedinIn size={20} />
            </a>

            <a
              href="mailto:ayushyadav260704@gmail.com"
              className="social-icon-btn"
              aria-label="Send direct email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}